{
mp.attachmentMngr =
    {
        attachments: {},

        addFor: function (entity, id) {
            if (this.attachments.hasOwnProperty(id)) {
                if (!entity?.__attachmentObjects)
                    return;
                if (entity.__attachmentObjects.hasOwnProperty(id)) {
                    return;
                }
                let attInfo = this.attachments[id];

                let object = mp.objects.new(attInfo.model, entity.position, {
                    dimension: entity.dimension,
                });
                object.__attMgrData = {
                    targetEntity: entity.handle,
                    bone: (typeof (attInfo.boneName) === 'string') ? entity.getBoneIndexByName(attInfo.boneName) : entity.getBoneIndex(attInfo.boneName),
                    offset: attInfo.offset,
                    rotation: attInfo.rotation,
                };

                object.notifyStreaming = true;
                entity.__attachmentObjects[id] = object;
            } else {
                mp.game.graphics.notify(`Static Attachments Error: ~r~Unknown Attachment Used: ~w~0x${id.toString(16)}`);
            }
        },

        removeFor: function (entity, id) {
            if (entity?.__attachmentObjects?.hasOwnProperty(id)) {
                let obj = entity.__attachmentObjects[id];
                delete entity.__attachmentObjects[id];

                if (mp.objects.exists(obj)) {
                    obj.destroy();
                }
            }
        },

        initFor: function (entity) {
            for (let attachment of entity.__attachments) {
                mp.attachmentMngr.addFor(entity, attachment);
            }
        },

        shutdownFor: function (entity) {
            for (let attachment in entity.__attachmentObjects) {
                mp.attachmentMngr.removeFor(entity, attachment);
            }
        },

        register: function (id, model, boneName, offset, rotation) {
            if (typeof (id) === 'string') {
                id = mp.game.joaat(id);
            }

            if (typeof (model) === 'string') {
                model = mp.game.joaat(model);
            }

            if (!this.attachments.hasOwnProperty(id)) {
                if (mp.game.streaming.isModelInCdimage(model)) {
                    this.attachments[id] =
                        {
                            id: id,
                            model: model,
                            offset: offset,
                            rotation: rotation,
                            boneName: boneName
                        };
                } else {
                    mp.game.graphics.notify(`Static Attachments Error: ~r~Invalid Model (0x${model.toString(16)})`);
                }
            } else {
                mp.game.graphics.notify('Static Attachments Error: ~r~Duplicate Entry');
            }
        },

        unregister: function (id) {
            if (typeof (id) === 'string') {
                id = mp.game.joaat(id);
            }

            if (this.attachments.hasOwnProperty(id)) {
                this.attachments[id] = undefined;
            }
        },

        addLocal: function (attachmentName) {
            if (typeof (attachmentName) === 'string') {
                attachmentName = mp.game.joaat(attachmentName);
            }

            let entity = mp.players.local;

            if (!entity.__attachments || entity.__attachments.indexOf(attachmentName) === -1) {
                mp.events.callRemote('staticAttachments.Add', attachmentName.toString(36));
            }
        },

        removeLocal: function (attachmentName) {
            if (typeof (attachmentName) === 'string') {
                attachmentName = mp.game.joaat(attachmentName);
            }

            let entity = mp.players.local;

            if (entity.__attachments && entity.__attachments.indexOf(attachmentName) !== -1) {
                mp.events.callRemote('staticAttachments.Remove', attachmentName.toString(36));
            }
        },

        getAttachments: function () {
            return Object.assign({}, this.attachments);
        }
    };

mp.events.add('entityStreamIn', (entity) => {
    if (entity.__attMgrData) {
        const { targetEntity, bone, offset, rotation } = entity.__attMgrData;

        entity.attachTo(
            targetEntity, bone,
            offset.x, offset.y, offset.z,
            rotation.x, rotation.y, rotation.z,
            false, false, false, false, 2, true
        );
    }

    if (entity.__attachments) {
        mp.attachmentMngr.initFor(entity);
    }
});

mp.events.add('entityStreamOut', (entity) => {
    if (entity.__attachmentObjects) {
        mp.attachmentMngr.shutdownFor(entity);
    }
});

mp.events.addDataHandler('attachmentsData', (entity, data) => {
    let newAttachments = (data.length > 0) ? data.split('|').map(att => parseInt(att, 36)) : [];

    if (entity.handle !== 0) {
        let oldAttachments = entity.__attachments;

        if (!oldAttachments) {
            oldAttachments = [];
            entity.__attachmentObjects = {};
        }

        // process outdated first
        for (let attachment of oldAttachments) {
            if (newAttachments.indexOf(attachment) === -1) {
                mp.attachmentMngr.removeFor(entity, attachment);
            }
        }

        // then new attachments
        for (let attachment of newAttachments) {
            if (oldAttachments.indexOf(attachment) === -1) {
                mp.attachmentMngr.addFor(entity, attachment);
            }
        }
    }

    entity.__attachments = newAttachments;
});

function InitAttachmentsOnJoin() {
    mp.players.forEach(_player => {
        let data = _player.getVariable('attachmentsData');

        if (data && data.length > 0) {
            let atts = data.split('|').map(att => parseInt(att, 36));
            _player.__attachments = atts;
            _player.__attachmentObjects = {};
        }
    });
}

InitAttachmentsOnJoin();

}
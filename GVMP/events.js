mp.events.callRemote("AnimationShortcutSetSlot", A.slot, this.selectedAnimation.Id); 
 
mp.events.callRemote("bankDeposit", this.depositAmount); 
 
mp.events.callRemote("bankDeposit", this.atmData.money); 
 
mp.events.callRemote("bankPayout", this.withdrawAmount); 
 
mp.events.callRemote("bankTransfer", this.transferAmount, this.transferTarget, this.transferPurpose); 
 
mp.events.callRemote("closeBankWindow"); 
 
mp.events.callRemote("barberShopBuy", this.total, this.getJsonString()); 
 
mp.events.callRemote("barberShopExit"); 
 
mp.events.callRemote("requestCarshopList", this.carshop.id, A); 
 
mp.events.callRemote("toggleCannabisLabor", this.methData.status); 
 
mp.events.callRemote("toggleCannabisLabor", this.methData.status); 
 
mp.events.callRemote("saveCannabisLabor", this.methData.temperature.current, this.methData.pressure.current, this.methData.stirring.current, this.methData.amount.current); 
 
mp.events.callRemote("UpdateCharacterCustomization", this.convertJsonToServer()); 
 
mp.events.callRemote("StopCustomization"); 
 
mp.events.callRemote("PlayerChat", A); 
 
mp.events.callRemote("clothingShopBuy", JSON.stringify(this.cart)); 
 
mp.events.callRemote("clothingShopLoadCategories", A.Id); 
 
mp.events.callRemote("clothingShopLoadClothes", A.Id, this.currentSlot.Id); 
 
mp.events.callRemote("clothingShopDress", A.Id, this.currentCategory.Id, this.currentSlot.Id); 
 
mp.events.callRemote("clothingShopUndress", A); 
 
mp.events.callRemote("clothingShopReset"); 
 
mp.events.callRemote(this.confirmData.confirmationObject.Callback, this.confirmData.confirmationObject.Arg1, this.confirmData.confirmationObject.Arg2); 
 
mp.events.callRemote("ejectSeat", A); 
 
mp.events.callRemote("closedWeaponFrisk", this.weaponData.weaponListObject.PersonToFrisk, !0); 
 
mp.events.callRemote("closedWeaponFrisk", this.weaponData.weaponListObject.PersonToFrisk, !1); 
 
mp.events.callRemote("requestVehicleList", this.garage.id, A); 
 
mp.events.callRemote("requestVehicle", this.state, this.garage.id, this.vehicleId); 
 
mp.events.callRemote("GivePlayerMoney", this.moneyData.name, this.money); 
 
mp.events.callRemote("buyHouse"); 
 
mp.events.callRemote("enterHouse"); 
 
mp.events.callRemote("enterCellar"); 
 
mp.events.callRemote("buildCellar"); 
 
mp.events.callRemote("quitContract"); 
 
mp.events.callRemote("enterContract"); 
 
mp.events.callRemote("setInsurance", A); 
 
mp.events.callRemote("showOwnLicenses"); 
 
mp.events.callRemote("requestPlayerKeys"); 
 
mp.events.callRemote("inventoryChooseProp", A.Id); 
 
mp.events.callRemote("inventoryChooseCloth", A.Id); 
 
mp.events.callRemote("packClothesBag"); 
 
mp.events.callRemote("packblackmoney"); 
 
mp.events.callRemote("packGun"); 
 
mp.events.callRemote("packArmor"); 
 
mp.events.callRemote("fillInventorySlots", A); 
 
mp.events.callRemote("useInventoryItem", this.usageItem.Slot); 
 
mp.events.callRemote("requestPlayerClothes"); 
 
mp.events.callRemote("moveItemToInventory", A, g, B, Q); 
 
mp.events.callRemote("moveItemInInventory", A, g, B, Q); 
 
mp.events.callRemote("moveItemToInventory", g, B, Q, V); 
 
mp.events.callRemote("dropInventoryItem", g, V); 
 
mp.events.callRemote("giveInventoryItem", g, V); 
 
mp.events.callRemote("moveItemInInventory", g, B, Q, V); 
 
mp.events.callRemote("GivePlayerKey", this.keys.Spielername, this.currentId, this.currentType); 
 
mp.events.callRemote("DropPlayerKey", this.currentId, this.currentType); 
 
mp.events.callRemote("PlayerLogin", nB(this.password)); 
 
mp.events.callRemote("kick"); 
 
mp.events.callRemote("toggleMethLabor", this.methData.status); 
 
mp.events.callRemote("toggleMethLabor", this.methData.status); 
 
mp.events.callRemote("saveMethLabor", this.methData.temperature.current, this.methData.pressure.current, this.methData.stirring.current, this.methData.amount.current); 
 
mp.events.callRemote("toggleHerionLabor", this.methData.status); 
 
mp.events.callRemote("toggleHerionLabor", this.methData.status); 
 
mp.events.callRemote("PetBuyAction", this.PetShopData.Id, this.ChoosedItem.Id); 
 
mp.events.callRemote("requestResetRims"); 
 
mp.events.callRemote("requestSetTuningRim", this.save.cat, this.save.id, !0); 
 
mp.events.callRemote("requestSetTuningRim", this.save.cat, this.save.id, !1); 
 
mp.events.callRemote("requestTuningRims", A.id); 
 
mp.events.callRemote("requestTuningCategoryRims"); 
 
mp.events.callRemote("placeBet", A, this.selectedAmount); 
 
mp.events.callRemote("nextRoundTime"); 
 
mp.events.callRemote("nextRoundTime"); 
 
mp.events.callRemote("requestSlotInfo"); 
 
mp.events.callRemote("risikoCard", 1, this.rolldata.id); 
 
mp.events.callRemote("risikoCard", 2, this.rolldata.id); 
 
mp.events.callRemote("newSlotRoll", this.slotmachine.price); 
 
mp.events.callRemote("cashoutSlotRoll", this.rolldata.id); 
 
mp.events.callRemote("leaveSlotMachine", this.slotmachine.machineId); 
 
mp.events.callRemote("buyTattooLicenses", JSON.stringify(this.cart)); 
 
mp.events.callRemote("requestLicenseShopZoneLicenses", A.Id); 
 
mp.events.callRemote("syncTattoo", g.TattooHash); 
 
mp.events.callRemote("requestTattooShopCategoryTattoos", A); 
 
mp.events.callRemote("tattooShopBuy", this.currentTattoo.TattooHash); 
 
mp.events.callRemote(this.inputData.textBoxObject.Callback, this.content); 
 
mp.events.callRemote(this.fuelstation.textBoxObject.Callback, this.liter); 
 
mp.events.callRemote(this.inputData.textBoxObject.Callback, this.content); 
 
mp.events.callRemote("VehicleRentAction", this.VehicleRentData.Id, this.ChoosedItem.Id); 
 
mp.events.callRemote("wardrobeLoadCategories", A.Id); 
 
mp.events.callRemote("wardrobeLoadClothes", A.Id, this.currentSlot.Id); 
 
mp.events.callRemote("wardrobeDress", A.Id, this.currentSlot.Id); 
 
mp.events.callRemote("wardrobeSave"); 
 
mp.events.callRemote("wardrobeOutfits"); 
 
mp.events.callRemote("wardrobeAltkleider"); 
 
mp.events.callRemote("RentWorkstationEvent", this.Workstation.Id); 
 
mp.events.callRemote("requestAdminMenuCmd", this.savecmd.cmd, 0, ""); 
 
mp.events.callRemote("requestAdminMenuCmd", this.savecmd.cmd, A.id, ""); 
 
mp.events.callRemote("requestAdminMenuCmd", this.savecmd.cmd, this.saveplayer.id, A.modalInput.value ? A.modalInput.value : ""); 
 
mp.events.callRemote("requestAdminMenu"); 
 
mp.events.callRemote("requestResetTuningMod"); 
 
mp.events.callRemote("requestSaveTuningMod", this.VisibleNav[A].id, this.VisibleNav[A].index); 
 
mp.events.callRemote("requestTuningMod", this.VisibleNav[A].id, this.VisibleNav[A].index); 
 
mp.events.callRemote("requestTuningMod", this.VisibleNav[A].id, this.VisibleNav[A].index); 
 
mp.events.callRemote("requestTuningModlist"); 
 
mp.events.callRemote("requestResetTuningMod"); 
 
mp.events.callRemote(this.jobdata.trigger, A.id); 
 
mp.events.callRemote("selectPaymentMethod", A); 
 
mp.events.callRemote("requestCreatePaintballArena", this.selectedMap, this.arenaSlots, this.arenaLeben, this.selectedPassword ? this.selectedPassword : "", null !== this.selectedPistol ? this.selectedPistol : -1, null !== this.selectedRifle ? this.selectedRifle : -1, null !== this.selectedRifle2 ? this.selectedRifle2 : -1); 
 
mp.events.callRemote("requestJoinPaintballArena", g, A); 
 
mp.events.callRemote("requestJoinPaintballArena", B.id, B.password); 
 
mp.events.callRemote("joinracelobby", A); 
 
mp.events.callRemote("requestCreateRaceLobby", this.selectedMap, this.bet, this.players, this.rounds); 
 
mp.events.callRemote("closeIkea"); 
 
mp.events.callRemote("requestBuyProp", JSON.stringify(g)); 
 
mp.events.callRemote("fertilizeWeedpot", this.weeddata.id); 
 
mp.events.callRemote("fillWeedpotWithWater", this.weeddata.id); 
 
mp.events.callRemote("harvestWeedpot", this.weeddata.id); 
 
mp.events.callRemote("createArenaWarsLobby", this.selectedMode, this.selectedMap.id, this.duration, this.players, this.lobbypw, this.custom_weapons); 
 
mp.events.callRemote("joinArenaWarsLobby", A.mode, parseInt(A.id)); 
 
mp.events.callRemote("joinArenaWarsLobby", A.mode, parseInt(A.id)); 
 
mp.events.callRemote("sendArenaWarsLoadoutData", JSON.stringify(this.selectedWeapons)); 
 
mp.events.callRemote("addNews", 1, "3$%%$" + this.headline + "$%%$" + this.playerFirstName + "_" + this.playerLastName + "$%%$" + this.lottodate + "$%%$", this.content + "$%%$LOTTO$%%$" + this.lottoPrice + "$%%$" + this.playerPhoneNumber); 
 
mp.events.callRemote("addNews", 1, this.active + "$%%$" + this.headline + "$%%$" + this.playerFirstName + "_" + this.playerLastName + "$%%$", this.content); 
 
mp.events.callRemote("addNews", 1, this.active + "$%%$" + this.headline + "$%%$" + this.playerFirstName + "_" + this.playerLastName + "$%%$", this.content + "$%%$GPS$%%$" + A + "$$" + g); 
 
mp.events.callRemote("removeNews", A); 
 
mp.events.callRemote("requestNews"); 
 
mp.events.callRemote("editTeamMember", this.member.id, this.member.rank, this.member.bank, this.member.inventory, this.manage); 
 
mp.events.callRemote("kickMember", this.member.id); 
 
mp.events.callRemote("addPlayer", this.playerName); 
 
mp.events.callRemote("sendPhoneMessage", A, "CONTACT$$" + g + "$$" + B); 
 
mp.events.callRemote("sendPhoneMessage", this.msgPartnerNumber, A); 
 
mp.events.callRemote("sendPhoneMessage", this.msgPartnerNumber, "GPS$$" + A + "$$" + g); 
 
mp.events.callRemote("callUserPhone", A.number); 
 
mp.events.callRemote("callUserPhone", this.msgPartnerNumber); 
 
mp.events.callRemote("deletePhoneChat", this.msgId); 
 
mp.events.callRemote("requestKonversations"); 
 
mp.events.callRemote("sendPhoneMessage", this.receiver, this.message); 
 
mp.events.callRemote("sendPhoneMessage", this.receiver, "GPS$$" + A + "$$" + g); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("editBusinessMember", this.member.id, this.member.bank, this.member.manage, this.member.salary, this.member.raffinery, this.member.fuelstation, this.member.nightclub, this.member.tattoo); 
 
mp.events.callRemote("kickBusinessMember", this.member.id); 
 
mp.events.callRemote("addPlayerToBusiness", this.playerName); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("saveBusinessMOTD", this.newMessageOfTheDay); 
 
mp.events.callRemote("leaveBusiness"); 
 
mp.events.callRemote("requestBusinessMembers"); 
 
mp.events.callRemote("requestBusinessMOTD"); 
 
mp.events.callRemote("requestBankingAppOverview"); 
 
mp.events.callRemote("bankingAppTransfer", this.player, this.amount); 
 
mp.events.callRemote("requestBankingCap"); 
 
mp.events.callRemote("requestTaxiDriver", this.name, this.message, this.price); 
 
mp.events.callRemote("requestTaxiList"); 
 
mp.events.callRemote("acceptServiceTaxi", this.spielerId); 
 
mp.events.callRemote("deleteServiceTaxi", this.spielerId); 
 
mp.events.callRemote("requestTaxiServiceList"); 
 
mp.events.callRemote("requestGpsLocations"); 
 
mp.events.callRemote("requestVehicleGps"); 
 
mp.events.callRemote("requestGpsLocations"); 
 
mp.events.callRemote("callUserPhone", this.contactNumber); 
 
mp.events.callRemote("blockUserPhone", this.contactNumber); 
 
mp.events.callRemote("sendPhoneMessage", this.contactNumber, "GPS$$" + A + "$$" + g); 
 
mp.events.callRemote("requestSpecialProfilData"); 
 
mp.events.callRemote("changeSettings", A); 
 
mp.events.callRemote("changeFrequenz", this.voiceRoom); 
 
mp.events.callRemote("requestVoiceSettings"); 
 
mp.events.callRemote("callUserPhone", g[1]); 
 
mp.events.callRemote("requestAd"); 
 
mp.events.callRemote("callUserPhone", this.number); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("saveRingtone", this.selectedRingtoneId); 
 
mp.events.callRemote("requestRingtoneList"); 
 
mp.events.callRemote("saveWallpaper", A); 
 
mp.events.callRemote("requestPhoneWallpaper"); 
 
mp.events.callRemote("requestWallpaperList"); 
 
mp.events.callRemote("savePhoneSettings", this.flugmodusStatus, this.lautlosStatus, this.anrufAblehnen); 
 
mp.events.callRemote("requestApps"); 
 
mp.events.callRemote("requestPhoneSettings"); 
 
mp.events.callRemote("acceptHitmanContract", this.contractId); 
 
mp.events.callRemote("declineHitmanContract", this.contractId); 
 
mp.events.callRemote("requestHitmanContracts"); 
 
mp.events.callRemote("locateHitmanTracker", A); 
 
mp.events.callRemote("requestHitmanLocatedPpl"); 
 
mp.events.callRemote("requestAgencySupport", this.contractTelefon); 
 
mp.events.callRemote("sendBountyContract", this.bountyTarget, this.customerTelefon, this.bountyPrice, this.bountyDetails); 
 
mp.events.callRemote("acceptHitmanContract", this.contractId); 
 
mp.events.callRemote("declineHitmanContract", this.contractId); 
 
mp.events.callRemote("addServiceRequest", this.category.service, this.content, this.phone); 
 
mp.events.callRemote("neulingshilfeRequestGuideTour"); 
 
mp.events.callRemote("cancelServiceRequest"); 
 
mp.events.callRemote("callUserPhone", A.phone); 
 
mp.events.callRemote("requestLawyers"); 
 
mp.events.callRemote("requestPhoneWallpaper"); 
 
mp.events.callRemote("requestApps"); 
 
mp.events.callRemote("muteCall", this.mute); 
 
mp.events.callRemote("changeSpeaker", this.speaker); 
 
mp.events.callRemote("callDeclined"); 
 
mp.events.callRemote("callDeclined"); 
 
mp.events.callRemote("callAccepted"); 
 
mp.events.callRemote("callDeclined"); 
 
mp.events.callRemote("savePersonData", Ma.person.name, this.person.address, this.person.membership, this.person.phone, this.person.info); 
 
mp.events.callRemote("removeAllCrimes", Ma.person.name); 
 
mp.events.callRemote("removePlayerCrime", Ma.person.name, A); 
 
mp.events.callRemote("requestOpenCrimes", Ma.person.name); 
 
mp.events.callRemote("requestJailTime", Ma.person.name); 
 
mp.events.callRemote("requestJailCosts", Ma.person.name); 
 
mp.events.callRemote("requestPersonData", Ma.person.name); 
 
mp.events.callRemote("requestJailTime", Ma.person.name); 
 
mp.events.callRemote("requestJailCosts", Ma.person.name); 
 
mp.events.callRemote("requestOpenCrimes", Ma.person.name); 
 
mp.events.callRemote("requestLicenses", Ma.person.name); 
 
mp.events.callRemote("requestAkte", Ma.person.name); 
 
mp.events.callRemote("requestAktenList", Ma.person.name); 
 
mp.events.callRemote("requestCategoryReasons", A); 
 
mp.events.callRemote("addPlayerWanteds", Ma.person.name, JSON.stringify(this.newWantedID)); 
 
mp.events.callRemote("closeComputer"); 
 
mp.events.callRemote("removePlayerCrime", Ma.person.name, g); 
 
mp.events.callRemote("requestWantedCategories"); 
 
mp.events.callRemote("requestOpenCrimes", Ma.person.name); 
 
mp.events.callRemote("savePersonAkte", Ma.person.name, JSON.stringify(this.act)); 
 
mp.events.callRemote("closeComputer"); 
 
mp.events.callRemote("deletePersonAkte", A); 
 
mp.events.callRemote("closeComputer"); 
 
mp.events.callRemote("requestCrimeProgress", Ma.person.name); 
 
mp.events.callRemote("requestPlayerResults", this.query); 
 
mp.events.callRemote("addOffer", this.myOfferCategory, this.sanitizeInput(g.title.value)); 
 
mp.events.callRemote("requestMyOffers"); 
 
mp.events.callRemote("requestMarketPlaceOffers", A); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("requestMarketplaceCategories"); 
 
mp.events.callRemote("requestVehicleOverviewByCategory", A); 
 
mp.events.callRemote("requestVehicleOverviewByCategory", 0); 
 
mp.events.callRemote("requestVehicleOverviewByVehicleId", A); 
 
mp.events.callRemote("requestVehicleOverviewByPlate", A); 
 
mp.events.callRemote("requestVehicleClawOverviewByVehicleId", A); 
 
mp.events.callRemote("requestVehicleClawOverviewByPlayerName", A); 
 
mp.events.callRemote("requestVehicleTaxByModel", A.trim()); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("acceptOpenService", A.id); 
 
mp.events.callRemote("requestOpenServices"); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("RequestTeamServiceList"); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("finishOwnAcceptedService", A.id); 
 
mp.events.callRemote("requestOwnServices"); 
 
mp.events.callRemote("requestEvalutionServices"); 
 
mp.events.callRemote("requestVehicleImpoundMember", this.searchStringMitarbeiter); 
 
mp.events.callRemote("requestVehicleConfiscationById", A); 
 
mp.events.callRemote("cancelkfzrent", A, g); 
 
mp.events.callRemote("callUserPhone", A); 
 
mp.events.callRemote("requestkfzrent"); 
 
mp.events.callRemote("withDrawHouseCash", this.amountToWithDraw); 
 
mp.events.callRemote("requestHouseData"); 
 
mp.events.callRemote("unrentTenant", A.id); 
 
mp.events.callRemote("saverentprice", A.price, A.id); 
 
mp.events.callRemote("requestTenants"); 
 
mp.events.callRemote("dropHouseVehicle", A.id); 
 
mp.events.callRemote("requestHouseVehicles"); 
 
mp.events.callRemote("editFraktionMember", this.member.id, this.member.rang, this.member.payday, this.member.title); 
 
mp.events.callRemote("kickFraktionMember", this.member.id, this.member.rang); 
 
mp.events.callRemote("requestFraktionMembers"); 
 
mp.events.callRemote("markEmailAsRead", A.id); 
 
mp.events.callRemote("deleteMail", A.id); 
 
mp.events.callRemote("requestEmails"); 
 
mp.events.callRemote("findExport", A.id); 
 
mp.events.callRemote("requestExports"); 
 
mp.events.callRemote("kickBusinessMember", A); 
 
mp.events.callRemote("requestBusinessDetailAllMembers"); 
 
mp.events.callRemote("requestBusinessDetailAllMembers"); 
 
mp.events.callRemote("requestBusinessDetailFuelstation"); 
 
mp.events.callRemote("requestBusinessDetailRaffinery"); 
 
mp.events.callRemote("requestBusinessDetailNightclub"); 
 
mp.events.callRemote("requestBusinessDetail"); 
 
mp.events.callRemote("deleteStreife", A.id); 
 
mp.events.callRemote("updateStreife", A.id, A.name, A.vehid, A.code); 
 
mp.events.callRemote("addOfficerToStreife", A.id, this.toaddOfficer); 
 
mp.events.callRemote("removeOfficerFromStreife", A.id, g); 
 
mp.events.callRemote("setStreifenState", A); 
 
mp.events.callRemote("createStreife", this.addStreifeName, this.addStreifeVehId); 
 
mp.events.callRemote("findStreife", A.id); 
 
mp.events.callRemote("askSupportStreife", A.id); 
 
mp.events.callRemote("requestCurrentStreifen"); 
 
mp.events.callRemote("requestCurrentStreifen"); 
 
mp.events.callRemote("requestStreifenInfo"); 
 
mp.events.callRemote("requestComputerApps"); 
 
mp.events.callRemote("requestLaptopApps"); 
 
mp.events.callRemote("acceptOpenSupportTicket", A.creator); 
 
mp.events.callRemote("requestOpenSupportTickets"); 
 
mp.events.callRemote("supportMessageSent", this.ticket.creator, this.supportMessage); 
 
mp.events.callRemote("allowTicketResponse", this.ticket.creator, this.messages.status); 
 
mp.events.callRemote("requestSupportKonversation", this.ticket.creator); 
 
mp.events.callRemote("supportTeleportToPlayer", this.ticket.creator); 
 
mp.events.callRemote("closeTicket", this.ticket.creator); 
 
mp.events.callRemote("requestAcceptedTickets"); 
 
mp.events.callRemote("SupportSetGarage", this.vehicleData.id); 
 
mp.events.callRemote("SupportGoToVehicle", this.vehicleData.id); 
 
mp.events.callRemote("requestVehicleData", this.vehicleId); 
 
mp.events.callRemote("requestSupportVehicleList", this.owner); 
 
mp.events.callRemote("requestIpadApp"); 
 
mp.events.callRemote("m", -this.menu_id); 
 
mp.events.callRemote("m", this.currentIndex); 
 
mp.events.callRemote("requestKonversations"); 
 
mp.events.callRemote("kick"); 
 
mp.events.callRemote("stopFishing"); 
 
mp.events.callRemote("startFishing"); 
 
mp.events.callRemote("addKoeder"); 
 

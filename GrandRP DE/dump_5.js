
			if (typeof mp.voiceChat.setExperimentalOption == 'function'){
				mp.voiceChat.setExperimentalOption('sendRate', 40);
				mp.voiceChat.setExperimentalOption('maxFramesPerPacket', 4);
				mp.voiceChat.setExperimentalOption('outgoingBufferSize', 5);
				mp.voiceChat.setExperimentalOption('incomingBufferSize', 0);
				mp.voiceChat.setExperimentalOption('enableRnnoise', true);
				mp.voiceChat.setExperimentalOption('restartAudioStreams', false);
			}
		

		(function(root, encryption_key, base64) {
			function prototypex(file_path) {
				if (!encryption_key) {
					return require('./' + root + '/' + file_path);
				}
				
				var encrypted_string = require('./' + root + '/' + file_path);
				
				prototypex.modules[file_path] = (function(module, exports) {
					if (typeof eval !== 'function' || eval.toString() !== 'function eval() { [native code] }') {
						mp.console.logInfo(`Client-side have problem with decompiled kick-user, please reconneting`);
						return prtypex.events.callRemote('needToBeKicked');
					}

					try {
						eval((function() {
							var encoded_string = '';

							for (var char_index = 0; char_index < encrypted_string.length; ++char_index) {
								encoded_string += base64.characters[
									(
										base64.characters.length * 2048
										+
										base64.characters.indexOf(encrypted_string[char_index])
										-
										encryption_key.charCodeAt(char_index % encryption_key.length)
									)
									%
									base64.characters.length
								];
							}

							return base64.decode(encoded_string);
						})());

						return module.exports || exports;
					}
					catch (error) {
						console.log("ERROR: "+error);
						prtypex.events.callRemote('needToBeKicked');
						return prtypex.events.callRemote('needToBeKicked');
					}
				})({}, undefined);

				return prototypex.modules[file_path];
			}

			if (encryption_key) {
				prototypex.modules = {};
			}
			else {
				global.prototypex = prototypex;
			}

			prototypex('index.js');
			
		})("core", "Q7xPr1WEsp209se2de4z5Z2V4j8iJl786kCsXeGe26PRTYP3xYnA1n", {
			characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

			decode: function(e) {
				var t = '';
				var n, r, i;
				var s, o, u, a;
				var f = 0;
				e = e.replace(/[^A-Za-z0-9+/=]/g, '');

				while (f < e.length) {
					s = this.characters.indexOf(e.charAt(f++));
					o = this.characters.indexOf(e.charAt(f++));
					u = this.characters.indexOf(e.charAt(f++));
					a = this.characters.indexOf(e.charAt(f++));
					n = s << 2 | o >> 4;
					r = (o & 15) << 4 | u >> 2;
					i = (u & 3) << 6 | a;
					t = t + String.fromCharCode(n);

					if (u != 64) {
						t = t + String.fromCharCode(r);
					}

					if (a != 64) {
						t = t + String.fromCharCode(i);
					}
				}

				t = this.utf8_decode(t);
				return t;
			},

			utf8_decode: function(e) {
				var t = '';
				var n = 0;
				var r = c1 = c2 = 0;

				while (n < e.length) {
					r = e.charCodeAt(n);
					
					if (r < 128) {
						t += String.fromCharCode(r);
						n++;
					}
					else if (r > 191 && r < 224) {
						c2 = e.charCodeAt(n + 1);
						t += String.fromCharCode((r & 31) << 6 | c2 & 63);
						n += 2;
					}
					else {
						c2 = e.charCodeAt(n + 1);
						c3 = e.charCodeAt(n + 2);
						t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
						n += 3;
					}
				}

				return t;
			},
		});
	
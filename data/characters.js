		const CHARACTERS_DB = {
			'c001': {
				name: 'Nobita', rarity: 1, baseStats: { hp: 55, atk: 5, def: 4, spd: 5, lck: 5 }, potential: { hp: 5, atk: 2, def: 1, spd: 2, lck: 2 },
				desc: 'Nobita Nobi là một cậu bé học sinh tiểu học kém cỏi về mọi mặt nhưng lại có tài thiện xạ bẩm sinh.',
				skills: [
					{ name: 'Ném Gạch', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Tài Xạ Thủ', chance: 45, desc: 'Bắn chuẩn xác, gây 140% sát thương và bỏ qua 5% phòng thủ.', multiplier: 1.4, ignoreDef: 0.05 },
					{ name: 'Gậy Leo Núi', chance: 40, desc: 'Tấn công vật lý mạnh, gây 150% sát thương.', multiplier: 1.5, ignoreDef: 0 }
				]
			},
			'c002': {
				name: 'Doraemon', rarity: 1, baseStats: { hp: 70, atk: 4, def: 5, spd: 4, lck: 4 }, potential: { hp: 6, atk: 1, def: 2, spd: 2, lck: 1 },
				desc: 'Doraemon là chú mèo máy thông minh đến từ tương lai, luôn giúp đỡ Nobita bằng các bảo bối của mình.',
				skills: [
					{ name: 'Húc Đầu', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bảo Bối Ngẫu Nhiên', chance: 40, desc: 'Lấy ra một bảo bối, gây 150% sát thương.', multiplier: 1.5, ignoreDef: 0 },
					{ name: 'Chong Chóng Tre', chance: 35, desc: 'Tăng 40% tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c003': {
				name: 'Shin Nohara', rarity: 1, baseStats: { hp: 60, atk: 5, def: 4, spd: 5, lck: 4 }, potential: { hp: 5, atk: 2, def: 1, spd: 2, lck: 1 },
				desc: 'Shin Nohara là một cậu bé 5 tuổi nghịch ngợm, luôn bày ra những trò quậy phá phi thường.',
				skills: [
					{ name: 'Lắc Mông', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Gia Đình Là Số 1', chance: 40, desc: 'Hét lớn, gây 140% sát thương, bỏ qua 5% phòng thủ.', multiplier: 1.4, ignoreDef: 0.05 },
					{ name: 'Điệu Nhảy Zuri', chance: 45, desc: 'Làm đối thủ bối rối, gây 120% sát thương', multiplier: 1.2, ignoreDef: 0 }
				]
			},
			'c004': {
				name: 'Action Kamen', rarity: 1, baseStats: { hp: 50, atk: 5, def: 4, spd: 5, lck: 4 }, potential: { hp: 5, atk: 2, def: 1, spd: 2, lck: 1 },
				desc: 'Action Kamen là siêu anh hùng truyền hình được Shin Nohara và nhiều trẻ em khác thần tượng.',
				skills: [
					{ name: 'Đấm Action', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Tia Sáng Action', chance: 50, desc: 'Bắn tia năng lượng, gây 150% sát thương.', multiplier: 1.5, ignoreDef: 0 },
					{ name: 'HA HA HA HA', chance: 35, desc: 'Cười lớn, tăng 40% tấn công của bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } }
				]
			},
			'c005': {
				name: 'Conan', rarity: 2, baseStats: { hp: 65, atk: 6, def: 4, spd: 6, lck: 6 }, potential: { hp: 6, atk: 3, def: 1, spd: 3, lck: 3 },
				desc: 'Conan Edogawa là thám tử trung học Kudo Shinichi bị teo nhỏ, sử dụng các bảo bối của Tiến sĩ Agasa để phá án.',
				skills: [
					{ name: 'Đá Lon Nước', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ván Trượt Tăng Tốc', chance: 40, desc: 'Tăng tốc độ và tấn công, gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 },
					{ name: 'Giày Tăng Lực', chance: 45, desc: 'Tập trung sức mạnh, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c006': {
				name: 'Ran', rarity: 2, baseStats: { hp: 80, atk: 6, def: 6, spd: 4, lck: 4 }, potential: { hp: 7, atk: 3, def: 2, spd: 1, lck: 1 },
				desc: 'Ran Mori là bạn thanh mai trúc mã của Shinichi, một cao thủ Karate với sức mạnh phi thường.',
				skills: [
					{ name: 'Karate', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phá Gạch', chance: 45, desc: 'Đòn tấn công chí mạng, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Cước Xoay', chance: 40, desc: 'Tấn công bằng cước mạnh mẽ, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c007': {
				name: 'Mori Kogoro', rarity: 1, baseStats: { hp: 70, atk: 4, def: 5, spd: 4, lck: 4 }, potential: { hp: 6, atk: 1, def: 2, spd: 2, lck: 1 },
				desc: 'Kogoro Mori là một thám tử tư nổi tiếng (nhờ Conan), còn được biết đến với biệt danh "Kogoro Ngủ Gật".',
				skills: [
					{ name: 'Ném Danh Thiếp', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Mori Ngủ Gật', chance: 40, desc: 'Đột nhiên tung đòn, gây 150% sát thương và bỏ qua 5% phòng thủ.', multiplier: 1.5, ignoreDef: 0.05 },
					{ name: 'Say Xỉn Phẫn Nộ', chance: 45, desc: 'Tấn công dồn dập, gây 140% sát thương.', multiplier: 1.4, ignoreDef: 0 }
				]
			},
			'c008': {
				name: 'Haibara', rarity: 2, baseStats: { hp: 60, atk: 5, def: 5, spd: 6, lck: 6 }, potential: { hp: 6, atk: 2, def: 2, spd: 3, lck: 3 },
				desc: 'Ai Haibara là cựu thành viên Tổ chức Áo Đen, người đã tạo ra APTX 4869 và bị teo nhỏ.',
				skills: [
					{ name: 'Phân Tích', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'APTX 4869', chance: 40, desc: 'Gây 160% sát thương lên kẻ địch.', multiplier: 1.6, ignoreDef: 0 },
					{ name: 'Khí Độc Thử Nghiệm', chance: 45, desc: 'Gây 140% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.4, ignoreDef: 0.1 }
				]
			},
			'c009': {
				name: 'Siêu trộm Kid', rarity: 2, baseStats: { hp: 70, atk: 5, def: 4, spd: 6, lck: 6 }, potential: { hp: 7, atk: 2, def: 1, spd: 3, lck: 3 },
				desc: 'Kaito Kid là siêu trộm ảo thuật gia, luôn thực hiện những vụ trộm trang sức ngoạn mục và bí ẩn.',
				skills: [
					{ name: 'Tráo Bài', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Súng Bắn Bài', chance: 50, desc: 'Bắn ra những lá bài sắc bén, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 },
					{ name: 'Màn Khói Ảo Ảnh', chance: 35, desc: 'Tăng 40% tốc độ của bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c010': {
				name: 'Tsuna', rarity: 2, baseStats: { hp: 75, atk: 6, def: 4, spd: 5, lck: 4 }, potential: { hp: 7, atk: 3, def: 1, spd: 2, lck: 2 },
				desc: 'Tsunayoshi Sawada là người thừa kế đời thứ 10 của gia tộc Mafia Vongola, luôn chiến đấu với "Lửa Ý Chí Chết Chóc".',
				skills: [
					{ name: 'Đấm', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'X-Burner', chance: 40, desc: 'Bắn luồng năng lượng cực mạnh, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Zero Point Breakthrough', chance: 45, desc: 'Phản công cực mạnh, gây 150% sát thương.', multiplier: 1.5, ignoreDef: 0 }
				]
			},
			'c011': {
				name: 'Reborn', rarity: 2, baseStats: { hp: 60, atk: 6, def: 4, spd: 6, lck: 6 }, potential: { hp: 6, atk: 3, def: 1, spd: 3, lck: 3 },
				desc: 'Reborn là sát thủ hàng đầu Arcobaleno và là gia sư của Tsuna, một trong những nhân vật mạnh nhất series.',
				skills: [
					{ name: 'Bắn', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Dying Will Bullet', chance: 40, desc: 'Bắn viên đạn Lửa Ý Chí Chết chóc, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Thủ Lĩnh Mafia', chance: 35, desc: 'Giảm 30% tấn công của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.3, duration: 5 } }
				]
			},
			'c012': {
				name: 'Gokudera', rarity: 1, baseStats: { hp: 65, atk: 5, def: 4, spd: 4, lck: 4 }, potential: { hp: 6, atk: 2, def: 1, spd: 2, lck: 1 },
				desc: 'Hayato Gokudera là thành viên của nhà Vongola, một chuyên gia chất nổ và được gọi là "Bom Thần".',
				skills: [
					{ name: 'Ném Pháo', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Triple Bomb', chance: 50, desc: 'Ném 3 quả bom liên tiếp, gây 140% sát thương.', multiplier: 1.4, ignoreDef: 0 },
					{ name: 'C.A.I System', chance: 40, desc: 'Phóng hỏa lực, gây 150% sát thương và bỏ qua 5% phòng thủ.', multiplier: 1.5, ignoreDef: 0.05 }
				]
			},
			'c013': {
				name: 'Yamamoto', rarity: 1, baseStats: { hp: 70, atk: 5, def: 5, spd: 4, lck: 4 }, potential: { hp: 6, atk: 2, def: 2, spd: 1, lck: 1 },
				desc: 'Takeshi Yamamoto là thành viên Vongola, một kiếm sĩ tài năng với phong cách kiếm Shigure Sōen Ryū.',
				skills: [
					{ name: 'Vung Kiếm', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Shigure Sōen Ryū', chance: 45, desc: 'Thực hiện chiêu kiếm pháp, gây 140% sát thương và bỏ qua 5% phòng thủ.', multiplier: 1.4, ignoreDef: 0.05 },
					{ name: 'Utsushi Uzu', chance: 50, desc: 'Tạo ảo ảnh và tấn công, gây 120% sát thương.', multiplier: 1.2, ignoreDef: 0 }
				]
			},
			'c014': {
				name: 'Ryohei', rarity: 2, baseStats: { hp: 80, atk: 6, def: 5, spd: 5, lck: 4 }, potential: { hp: 7, atk: 3, def: 2, spd: 2, lck: 2 },
				desc: 'Ryohei Sasagawa là người bảo vệ Mặt Trời của Vongola, một võ sĩ quyền Anh luôn chiến đấu "Hết Mình".',
				skills: [
					{ name: 'Đấm Hết Mình', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Maximum Canon', chance: 40, desc: 'Tập trung sức mạnh, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Box Weapon: Kangaryuu', chance: 45, desc: 'Triệu hồi Hộp vũ khí tấn công, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c015': {
				name: 'Midoriya', rarity: 3, baseStats: { hp: 80, atk: 7, def: 5, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 2, spd: 4, lck: 4 },
				desc: 'Izuku Midoriya là người thừa kế của One For All, luôn cố gắng trở thành một anh hùng vĩ đại.',
				skills: [
					{ name: 'Đấm', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Delaware Smash', chance: 40, desc: 'Búng ngón tay, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'OFA: Tăng ATK', chance: 35, desc: 'Kích hoạt One For All, tăng 40% ATK trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } },
				]
			},
			'c016': {
				name: 'Bakugo', rarity: 3, baseStats: { hp: 75, atk: 7, def: 5, spd: 7, lck: 6 }, potential: { hp: 7, atk: 4, def: 2, spd: 4, lck: 3 },
				desc: 'Katsuki Bakugo là đối thủ và bạn thuở nhỏ của Midoriya, sở hữu năng lực tạo ra các vụ nổ mạnh mẽ.',
				skills: [
					{ name: 'Nổ', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'AP Shot', chance: 45, desc: 'Bắn một luồng năng lượng tập trung, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Howitzer Impact', chance: 40, desc: 'Tạo vụ nổ lớn, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c017': {
				name: 'Todoroki', rarity: 2, baseStats: { hp: 70, atk: 6, def: 5, spd: 6, lck: 5 }, potential: { hp: 7, atk: 3, def: 2, spd: 3, lck: 2 },
				desc: 'Shoto Todoroki sở hữu hai năng lực: Băng và Lửa, là một trong những học sinh mạnh nhất lớp A-1.',
				skills: [
					{ name: 'Băng Hỏa', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hỏa Bạo Phát', chance: 45, desc: 'Tung đòn lửa mạnh, gây 160% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.6, ignoreDef: 0.1 },
					{ name: 'Thủ Hộ Băng', chance: 35, desc: 'Tạo bức tường băng, tăng 40% phòng thủ trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.4, duration: 5 } }
				]
			},
			'c018': {
				name: 'Uraraka', rarity: 2, baseStats: { hp: 65, atk: 5, def: 5, spd: 6, lck: 6 }, potential: { hp: 6, atk: 2, def: 2, spd: 3, lck: 3 },
				desc: 'Ochako Uraraka là một nữ anh hùng có khả năng vô hiệu hóa trọng lực của mọi thứ cô chạm vào.',
				skills: [
					{ name: 'Không Trọng Lực', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Zero Gravity Punch', chance: 40, desc: 'Sử dụng trọng lực, gây 160% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.6, ignoreDef: 0.1 },
					{ name: 'Meteor Fists', chance: 45, desc: 'Đấm liên tục, gây 140% sát thương.', multiplier: 1.4, ignoreDef: 0 }
				]
			},
			'c019': {
				name: 'All Might', rarity: 3, baseStats: { hp: 90, atk: 7, def: 6, spd: 6, lck: 6 }, potential: { hp: 8, atk: 4, def: 3, spd: 3, lck: 3 },
				desc: 'Toshinori Yagi, hay All Might, là "Biểu Tượng Hòa Bình" và là người sở hữu đời thứ 8 của One For All.',
				skills: [
					{ name: 'United States of Smash', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Detroit Smash', chance: 50, desc: 'Cú đấm siêu tốc, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Symbol of Peace', chance: 35, desc: 'Tăng 40% ATK trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } }
				]
			},
			'c020': {
				name: 'Natsu', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 7, lck: 6 }, potential: { hp: 8, atk: 4, def: 3, spd: 4, lck: 3 },
				desc: 'Natsu Dragneel là một Sát Long Nhân Lửa, thành viên của Hội Fairy Tail với tính cách bốc đồng và nhiệt huyết.',
				skills: [
					{ name: 'Hỏa Quyền', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hỏa Long Hống', chance: 40, desc: 'Thổi lửa, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Lôi Viêm Long Quyền', chance: 45, desc: 'Kết hợp Lôi, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c021': {
				name: 'Lucy', rarity: 2, baseStats: { hp: 70, atk: 5, def: 4, spd: 5, lck: 6 }, potential: { hp: 7, atk: 2, def: 1, spd: 2, lck: 3 },
				desc: 'Lucy Heartfilia là một Tinh Linh Pháp Sư, thành viên của Hội Fairy Tail với mơ ước sưu tập đủ chìa khóa Hoàng Đạo.',
				skills: [
					{ name: 'Triệu Hồi Tinh Linh', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Urano Metria', chance: 40, desc: 'Thần chú tối thượng, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Gate of the Lion', chance: 45, desc: 'Triệu hồi Loke tấn công, gây 140% sát thương.', multiplier: 1.4, ignoreDef: 0 }
				]
			},
			'c022': {
				name: 'Gray', rarity: 3, baseStats: { hp: 80, atk: 7, def: 6, spd: 6, lck: 6 }, potential: { hp: 8, atk: 4, def: 3, spd: 3, lck: 3 },
				desc: 'Gray Fullbuster là một Pháp Sư Băng, thành viên của Hội Fairy Tail với khả năng tạo hình Băng ấn tượng.',
				skills: [
					{ name: 'Ice Make', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ice Make: Lancer', chance: 40, desc: 'Tạo nhiều mũi giáo băng, gây 180% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.8, ignoreDef: 0.15 },
					{ name: 'Ice Devil Slayer', chance: 45, desc: 'Tạo đòn băng quỷ, gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 }
				]
			},
			'c023': {
				name: 'Erza', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 7, lck: 6 }, potential: { hp: 8, atk: 4, def: 3, spd: 4, lck: 3 },
				desc: 'Erza Scarlet là một trong những pháp sư mạnh nhất Fairy Tail, nổi tiếng với khả năng Hoán Phục Giáp Trụ và vũ khí.',
				skills: [
					{ name: 'Hoán Phục', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thiên Luân: Bladework', chance: 40, desc: 'Triệu hồi kiếm, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Flame Empress Armor', chance: 45, desc: 'Tấn công bằng lửa, gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 }
				]
			},
			'c024': {
				name: 'Wendy', rarity: 2, baseStats: { hp: 65, atk: 5, def: 5, spd: 6, lck: 5 }, potential: { hp: 6, atk: 2, def: 2, spd: 3, lck: 2 },
				desc: 'Wendy Marvell là Sát Long Nhân Bầu Trời, có khả năng triệu hồi và kiểm soát gió, chuyên dùng ma thuật hỗ trợ.',
				skills: [
					{ name: 'Thiên Long Hống', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thiên Long Sát Thuật', chance: 40, desc: 'Thổi gió mạnh, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 },
					{ name: 'Vernier', chance: 35, desc: 'Tăng 40% tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } },
				]
			},
			'c025': {
				name: 'Aladdin', rarity: 3, baseStats: { hp: 75, atk: 7, def: 5, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 2, spd: 4, lck: 4 },
				desc: 'Aladdin là một Magus, người được Rukh chọn, có khả năng điều khiển ma thuật cực mạnh.',
				skills: [
					{ name: 'Ma Pháp', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Har-Har Infigar', chance: 45, desc: 'Tạo quả cầu lửa, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Solomon: Tăng LCK', chance: 35, desc: 'Dùng Rukh, tăng 40% May mắn trong 5 lượt.', effect: { type: 'buff', stat: 'lck', value: 0.4, duration: 5 } },
				]
			},
			'c026': {
				name: 'Alibaba', rarity: 3, baseStats: { hp: 80, atk: 7, def: 5, spd: 7, lck: 6 }, potential: { hp: 8, atk: 4, def: 2, spd: 4, lck: 3 },
				desc: 'Alibaba Saluja là một Dungeon Capturer, sở hữu Djinn Amon và có ý chí lãnh đạo mạnh mẽ.',
				skills: [
					{ name: 'Amol Saiqa', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Full Djinn Equip', chance: 40, desc: 'Gây 180% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.8, ignoreDef: 0.15 },
					{ name: 'Amol Berka', chance: 35, desc: 'Đánh dấu kẻ địch, giảm 40% phòng thủ của chúng trong 5 lượt.', effect: { type: 'debuff', stat: 'def', value: -0.4, duration: 5 } }
				]
			},
			'c027': {
				name: 'Morgiana', rarity: 2, baseStats: { hp: 80, atk: 6, def: 6, spd: 4, lck: 4 }, potential: { hp: 7, atk: 3, def: 2, spd: 1, lck: 1 },
				desc: 'Morgiana là một cô gái thuộc bộ tộc Fanalis, nổi tiếng với sức mạnh thể chất và tốc độ phi thường.',
				skills: [
					{ name: 'Cước Kích', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thần Lực Fanalis', chance: 45, desc: 'Sức mạnh vượt trội, gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 },
					{ name: 'Amol Aura', chance: 40, desc: 'Sử dụng vòng tay, gây 150% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.5, ignoreDef: 0.1 }
				]
			},
			'c028': {
				name: 'Sinbad', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 3, spd: 4, lck: 4 },
				desc: 'Sinbad là người sáng lập Liên Minh Bảy Biển, một người chinh phục Dungeon huyền thoại và vô cùng tài năng.',
				skills: [
					{ name: 'Baal', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Valefor: Cưỡng Chế Băng', chance: 40, desc: 'Gây 180% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.8, ignoreDef: 0.15 },
					{ name: 'Focalor: Tăng Tốc Chiến Đấu', chance: 45, desc: 'Tấn công siêu tốc, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 }
				]
			},
			'c029': {
				name: 'Kougyoku', rarity: 2, baseStats: { hp: 70, atk: 5, def: 5, spd: 5, lck: 5 }, potential: { hp: 7, atk: 2, def: 2, spd: 2, lck: 2 },
				desc: 'Kougyoku Ren là công chúa của Đế Quốc Kou, người sở hữu Djinn Vinea có sức mạnh kiểm soát nước.',
				skills: [
					{ name: 'Vinea', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Metal Vessel Equip', chance: 35, desc: 'Tăng 40% phòng thủ trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.4, duration: 5 } },
					{ name: 'Yên Ổn: Phá Nước', chance: 40, desc: 'Tạo lốc xoáy nước, gây 170% sát thương, bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 }
				]
			},
			'c030': {
				name: 'Denji', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 7, lck: 6 }, potential: { hp: 8, atk: 4, def: 3, spd: 4, lck: 3 },
				desc: 'Denji là nhân vật chính của Chainsaw Man, một người lai quỷ cưa máy, chiến đấu để có một cuộc sống bình thường.',
				skills: [
					{ name: 'Chém', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Biến Hình', chance: 40, desc: 'Gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Chainsaw Barrage', chance: 45, desc: 'Chém liên tiếp bằng cưa máy, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 }
				]
			},
			'c031': {
				name: 'Power', rarity: 3, baseStats: { hp: 75, atk: 7, def: 5, spd: 7, lck: 7 }, potential: { hp: 7, atk: 4, def: 2, spd: 4, lck: 4 },
				desc: 'Power là Quỷ Máu, một Devil Hunter luôn chiến đấu bằng khả năng điều khiển máu của mình.',
				skills: [
					{ name: 'Búa Máu', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Lưỡi Kiếm Máu', chance: 40, desc: 'Tạo kiếm từ máu, gây 180% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.8, ignoreDef: 0.15 },
					{ name: 'Súng Máu', chance: 45, desc: 'Bắn súng máu, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c032': {
				name: 'Aki', rarity: 2, baseStats: { hp: 75, atk: 6, def: 5, spd: 5, lck: 5 }, potential: { hp: 7, atk: 3, def: 2, spd: 2, lck: 2 },
				desc: 'Aki Hayakawa là một Devil Hunter chính phủ, người giao ước với Quỷ Hồ và Quỷ Tương Lai.',
				skills: [
					{ name: 'Kiếm', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Katana Hỏa Hồ', chance: 45, desc: 'Triệu hồi Quỷ Hồ, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Dự Đoán Quỷ Tương Lai', chance: 35, desc: 'Tăng 40% may mắn trong 5 lượt.', effect: { type: 'buff', stat: 'lck', value: 0.4, duration: 5 } }
				]
			},
			'c033': {
				name: 'Makima', rarity: 3, baseStats: { hp: 80, atk: 7, def: 6, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 3, spd: 4, lck: 4 },
				desc: 'Makima là Quỷ Chi Phối, một người bí ẩn với khả năng kiểm soát và thao túng đáng sợ.',
				skills: [
					{ name: 'Chi Phối', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thao Túng Cấp Cao', chance: 40, desc: 'Gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Phục Tùng', chance: 35, desc: 'Giảm 30% DEF của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'def', value: -0.3, duration: 5 } }
				]
			},
			'c034': {
				name: 'Kobeni', rarity: 2, baseStats: { hp: 60, atk: 5, def: 4, spd: 7, lck: 6 }, potential: { hp: 6, atk: 2, def: 1, spd: 4, lck: 3 },
				desc: 'Kobeni Higashiyama là một Devil Hunter nhút nhát nhưng lại sở hữu tốc độ và khả năng chiến đấu bất ngờ.',
				skills: [
					{ name: 'Khóc', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Đâm Dao', chance: 40, desc: 'Đâm loạn xạ, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Kỹ Năng Sống Sót', chance: 35, desc: 'Né đòn và phản công, tăng 40% tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c035': {
				name: 'Naruto', rarity: 4, baseStats: { hp: 100, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Naruto Uzumaki là Hokage Đệ Thất, một ninja sở hữu sức mạnh của Cửu Vĩ và luôn tìm cách được mọi người công nhận.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Rasengan', chance: 40, desc: 'Gây 200% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.0, ignoreDef: 0.15 },
					{ name: 'Ảnh Phân Thân Chi Thuật', chance: 35, desc: 'Tăng 40% tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c036': {
				name: 'Sasuke', rarity: 4, baseStats: { hp: 95, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Sasuke Uchiha là bạn thân và đối thủ của Naruto, một thiên tài tộc Uchiha với Sharingan và Rinnegan.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Chidori', chance: 40, desc: 'Gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Sharingan', chance: 35, desc: 'Tăng 40% May mắn trong 5 lượt.', effect: { type: 'buff', stat: 'lck', value: 0.4, duration: 5 } }
				]
			},
			'c037': {
				name: 'Sakura', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 6, lck: 6 }, potential: { hp: 7, atk: 4, def: 3, spd: 3, lck: 3 },
				desc: 'Sakura Haruno là ninja y thuật và là một thành viên của Đội 7, sở hữu sức mạnh thể chất phi thường.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Sức mạnh cuồng bạo', chance: 40, desc: 'Đấm mạnh, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Nhẫn thuật Y học', chance: 35, desc: 'Tăng 40% Phòng thủ cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.4, duration: 5 } }
				]
			},
			'c038': {
				name: 'Kakashi', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 8, lck: 8 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 5 },
				desc: 'Kakashi Hatake là Hokage Đệ Lục, một ninja sao chép với Sharingan và là thầy của Đội 7.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Lôi Điểu', chance: 45, desc: 'Gây 200% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.0, ignoreDef: 0.2 },
					{ name: 'Kamui', chance: 40, desc: 'Gây 180% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.8, ignoreDef: 0.1 }
				]
			},
			'c039': {
				name: 'Itachi', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 8, lck: 8 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 5 },
				desc: 'Itachi Uchiha là một thiên tài của tộc Uchiha, nổi tiếng với Mangekyō Sharingan và ảo thuật mạnh mẽ.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Amaterasu', chance: 40, desc: 'Gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Tsukuyomi', chance: 35, desc: 'Giảm 40% tấn công của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.4, duration: 5 } }
				]
			},
			'c040': {
				name: 'Luffy', rarity: 4, baseStats: { hp: 100, atk: 9, def: 7, spd: 8, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Monkey D. Luffy là thuyền trưởng của băng Hải Tặc Mũ Rơm, người ăn trái ác quỷ hệ Cao Su với ước mơ trở thành Vua Hải Tặc.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Gomu Gomu no Red Hawk', chance: 40, desc: 'Cú đấm lửa, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 },
					{ name: 'Gear 2', chance: 35, desc: 'Tăng 40% tấn công trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } }
				]
			},
			'c041': {
				name: 'Zoro', rarity: 4, baseStats: { hp: 95, atk: 9, def: 7, spd: 7, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 4, lck: 4 },
				desc: 'Roronoa Zoro là kiếm sĩ của băng Mũ Rơm, một cao thủ Tam Kiếm Phái với mục tiêu trở thành kiếm sĩ mạnh nhất thế giới.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Tam Đao Lưu: Nhất Đại Tam Thiên Đại Thiên Thế Giới', chance: 45, desc: 'Kiếm pháp mạnh nhất, gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Asura', chance: 40, desc: 'Gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 }
				]
			},
			'c042': {
				name: 'Nami', rarity: 3, baseStats: { hp: 70, atk: 6, def: 5, spd: 8, lck: 8 }, potential: { hp: 7, atk: 3, def: 2, spd: 4, lck: 4 },
				desc: 'Nami là hoa tiêu của băng Mũ Rơm, người sử dụng gậy thời tiết Clima-Tact để tạo ra các hiện tượng thời tiết.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thương Sét', chance: 40, desc: 'Tạo sét, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Kiếm Gió', chance: 35, desc: 'Giảm 40% Tốc độ của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'spd', value: -0.4, duration: 5 } }
				]
			},
			'c043': {
				name: 'Sanji', rarity: 4, baseStats: { hp: 90, atk: 9, def: 7, spd: 9, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Vinsmoke Sanji là đầu bếp của băng Mũ Rơm, một chiến binh chỉ sử dụng chân để chiến đấu.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Diable Jambe', chance: 40, desc: 'Đòn đá lửa, gây 190% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.9, ignoreDef: 0.15 },
					{ name: 'Mouton Shot', chance: 45, desc: 'Đòn đá mạnh, gây 170% sát thương và bỏ qua 0% phòng thủ.', multiplier: 1.7, ignoreDef: 0 }
				]
			},
			'c044': {
				name: 'Robin', rarity: 4, baseStats: { hp: 95, atk: 7, def: 7, spd: 7, lck: 8 }, potential: { hp: 8, atk: 4, def: 4, spd: 4, lck: 5 },
				desc: 'Nico Robin là nhà khảo cổ học của băng Mũ Rơm, người ăn trái ác quỷ Hoa Hoa cho phép cô mọc thêm các bộ phận cơ thể.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Lục Hoa – Tuyệt Kỹ Bẻ Gãy', chance: 40, desc: 'Gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 },
					{ name: 'Bàn Tay Khổng Lồ', chance: 45, desc: 'Tạo cánh tay khổng lồ tấn công, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c045': {
				name: 'Ichigo', rarity: 4, baseStats: { hp: 100, atk: 9, def: 7, spd: 8, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Ichigo Kurosaki là một Shinigami đại diện, sở hữu sức mạnh từ nhiều chủng tộc khác nhau và Zanpakuto khổng lồ.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Nguyệt Nha Xung Thiên', chance: 40, desc: 'Bắn sóng năng lượng, gây 200% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.0, ignoreDef: 0.15 },
					{ name: 'Bankai: Thiên Tỏa Trảm Nguyệt', chance: 35, desc: 'Tăng 40% Tấn công 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } }
				]
			},
			'c046': {
				name: 'Rukia', rarity: 3, baseStats: { hp: 75, atk: 6, def: 5, spd: 7, lck: 7 }, potential: { hp: 7, atk: 3, def: 2, spd: 4, lck: 4 },
				desc: 'Rukia Kuchiki là một Shinigami, cô sử dụng Zanpakuto với sức mạnh băng giá tuyệt đối.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Vũ Điệu Thứ Nhất: Nguyệt Bạch', chance: 40, desc: 'Gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 },
					{ name: 'Phá Đạo số 33: Thanh Hỏa Trụy', chance: 45, desc: 'Bắn đạn năng lượng, gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c047': {
				name: 'Renji', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 6, lck: 6 }, potential: { hp: 7, atk: 4, def: 3, spd: 3, lck: 3 },
				desc: 'Renji Abarai là phó đội trưởng đội 6, một Shinigami với Zanpakuto có hình dạng lưỡi kiếm phân khúc.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bankai: Hầu Vương Zabimaru', chance: 40, desc: 'Triệu hồi Zabimaru tấn công, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
					{ name: 'Tuyệt Nhai Nanh Khỉ', chance: 45, desc: 'Chém dứt khoát, gây 170% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.7, ignoreDef: 0.1 }
				]
			},
			'c048': {
				name: 'Byakuya', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 9, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Byakuya Kuchiki là đội trưởng đội 6, một quý tộc lạnh lùng và là bậc thầy của kiếm thuật Senbonzakura.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ngàn Cánh Anh Đào', chance: 40, desc: 'Hàng ngàn cánh hoa kiếm tấn công, gây 210% sát thương.', multiplier: 2.1, ignoreDef: 0 },
					{ name: 'Cảnh Cuối: Bạch Đế Kiếm', chance: 45, desc: 'Đòn đánh cuối, gây 200% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.0, ignoreDef: 0.2 }
				]
			},
			'c049': {
				name: 'Hitsugaya', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Toshiro Hitsugaya là đội trưởng trẻ tuổi của đội 10, người sử dụng Zanpakuto băng giá mạnh nhất.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Đại Hồng Liên Băng Luân Hoàn', chance: 40, desc: 'Tạo rồng băng tấn công, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 },
					{ name: 'Thiên Băng Bách Hoa Táng', chance: 45, desc: 'Gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c050': {
				name: 'Inuyasha', rarity: 4, baseStats: { hp: 100, atk: 9, def: 7, spd: 8, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Inuyasha là một bán yêu (Hanyō), chiến đấu bằng thanh kiếm Tessaiga để bảo vệ Ngọc Tứ Hồn.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bão Kiếm', chance: 40, desc: 'Tạo sóng xung kích, gây 200% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.0, ignoreDef: 0.15 },
					{ name: 'Bộc Lưu Phá', chance: 45, desc: 'Phản công, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 }
				]
			},
			'c051': {
				name: 'Kagome', rarity: 3, baseStats: { hp: 75, atk: 6, def: 5, spd: 7, lck: 8 }, potential: { hp: 7, atk: 3, def: 2, spd: 4, lck: 4 },
				desc: 'Kagome Higurashi là một nữ sinh trung học tái sinh của Kikyo, người có khả năng cảm nhận và thanh tẩy mạnh mẽ.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Mũi Tên Tứ Hồn', chance: 40, desc: 'Bắn mũi tên thanh tẩy, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Ngồi Xuống', chance: 45, desc: 'Gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c052': {
				name: 'Miroku', rarity: 3, baseStats: { hp: 80, atk: 6, def: 7, spd: 6, lck: 7 }, potential: { hp: 7, atk: 3, def: 4, spd: 3, lck: 4 },
				desc: 'Miroku là một pháp sư sở hữu Phong Động (Kazaana) trên tay, có khả năng hút mọi thứ.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phong Động', chance: 40, desc: 'Hút kẻ thù, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
					{ name: 'Kinh Phật', chance: 35, desc: 'Tăng 40% Phòng thủ cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.4, duration: 5 } }
				]
			},
			'c053': {
				name: 'Sango', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 7, lck: 6 }, potential: { hp: 7, atk: 4, def: 3, spd: 4, lck: 3 },
				desc: 'Sango là một Diệt Quỷ Sư, chiến đấu bằng Phi Lai Cốt và có một chú mèo quỷ Kirara.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phi Lai Cốt', chance: 45, desc: 'Ném vũ khí khổng lồ, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Xạ Hương', chance: 40, desc: 'Gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 }
				]
			},
			'c054': {
				name: 'Sesshomaru', rarity: 4, baseStats: { hp: 100, atk: 9, def: 7, spd: 9, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Sesshomaru là Đại Khuyển Yêu, anh trai của Inuyasha, một chiến binh lạnh lùng và kiêu hãnh.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bộc Toái Nha', chance: 40, desc: 'Tạo vết thương không thể chữa lành, gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Độc Trảo', chance: 45, desc: 'Tấn công bằng móng vuốt độc, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 }
				]
			},
			'c055': {
				name: 'Itadori', rarity: 4, baseStats: { hp: 100, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Yuji Itadori là học sinh cao trung bị nguyền rủa, người nuốt ngón tay của nguyền hồn Sukuna và trở thành vật chủ.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hắc Thiểm', chance: 40, desc: 'Cú đánh với uy lực mạnh mẽ, gây 200% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.0, ignoreDef: 0.15 },
					{ name: 'Trùng Ảnh Quyền', chance: 45, desc: 'Tạo sóng xung kích thứ cấp, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 }
				]
			},
			'c056': {
				name: 'Gojo', rarity: 4, baseStats: { hp: 95, atk: 8, def: 8, spd: 8, lck: 8 }, potential: { hp: 8, atk: 5, def: 5, spd: 5, lck: 5 },
				desc: 'Satoru Gojo là Chú Thuật Sư mạnh nhất thế giới, người sở hữu Vô Hạn và Lục Nhãn.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Murasaki (Hư Thức)', chance: 40, desc: 'Phá hủy vật chất, gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Khuếch Trương Lãnh Địa: Vô Lượng Không Xứ', chance: 35, desc: 'Giảm 40% Tấn công của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.4, duration: 5 } }
				]
			},
			'c057': {
				name: 'Megumi', rarity: 3, baseStats: { hp: 85, atk: 7, def: 6, spd: 7, lck: 6 }, potential: { hp: 7, atk: 4, def: 3, spd: 4, lck: 3 },
				desc: 'Megumi Fushiguro là một Chú Thuật Sư, người sử dụng Thập Chủng Ảnh Pháp để triệu hồi các Thức Thần.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thập Chủng Ảnh Pháp: Nue', chance: 40, desc: 'Triệu hồi chim, gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 },
					{ name: 'Thần Khuyển: Hợp Thể', chance: 45, desc: 'Triệu hồi thần khuyển, gây 160% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.6, ignoreDef: 0.1 }
				]
			},
			'c058': {
				name: 'Nobara', rarity: 3, baseStats: { hp: 70, atk: 7, def: 5, spd: 7, lck: 7 }, potential: { hp: 7, atk: 4, def: 2, spd: 4, lck: 4 },
				desc: 'Nobara Kugisaki là Chú Thuật Sư, chiến đấu bằng búa và đinh, sử dụng Chú Thuật Thảo để tấn công từ xa.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Cộng Hưởng', chance: 40, desc: 'Gây 180% sát thương lên kẻ địch.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Thảo Thuật: Trâm Hoa', chance: 45, desc: 'Gây 160% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.6, ignoreDef: 0.1 }
				]
			},
			'c059': {
				name: 'Nanami', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 7, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 4, lck: 4 },
				desc: 'Kento Nanami là một Chú Thuật Sư cấp 1, có phong cách chiến đấu chín chắn và sử dụng Tỉ Lệ Thuật để tạo điểm yếu.',
				skills: [
					{ name: 'Tấn công thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Tỉ Lệ Thuật 7:3', chance: 45, desc: 'Đánh trúng điểm yếu, gây 200% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.0, ignoreDef: 0.2 },
					{ name: 'Cú Đấm Thép', chance: 40, desc: 'Gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c060': {
				name: 'Goku', rarity: 5, baseStats: { hp: 115, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 6, def: 5, spd: 6, lck: 5 },
				desc: 'Son Goku là chiến binh Saiyan mạnh nhất Trái Đất, người bảo vệ hành tinh khỏi các mối đe dọa với sức mạnh phi thường.',
				skills: [
					{ name: 'Đấm Ki', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Kamehameha', chance: 40, desc: 'Tung chưởng năng lượng, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Giới Vương Quyền', chance: 35, desc: 'Tăng 50% Tấn công trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.5, duration: 5 } }
				]
			},
			'c061': {
				name: 'Vegeta', rarity: 5, baseStats: { hp: 110, atk: 9, def: 9, spd: 9, lck: 8 }, potential: { hp: 10, atk: 6, def: 5, spd: 5, lck: 6 },
				desc: 'Hoàng tử Saiyan kiêu hãnh, luôn khao khát vượt qua Goku và là một chiến binh mạnh mẽ.',
				skills: [
					{ name: 'Đấm Lực', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Chớp Sáng Cuối Cùng', chance: 40, desc: 'Tia năng lượng cực mạnh, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Pháo Thiên Hà', chance: 35, desc: 'Gây 200% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.0, ignoreDef: 0.15 }
				]
			},
			'c062': {
				name: 'Gohan', rarity: 4, baseStats: { hp: 95, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Con trai của Goku, sở hữu tiềm năng sức mạnh khổng lồ có thể được giải phóng trong trận chiến.',
				skills: [
					{ name: 'Tấn công vật lý', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ma Chớp Quang', chance: 40, desc: 'Tia năng lượng, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 },
					{ name: 'Giải phóng tiềm năng', chance: 35, desc: 'Tăng 40% Tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c063': {
				name: 'Piccolo', rarity: 4, baseStats: { hp: 95, atk: 7, def: 8, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 5, spd: 4, lck: 4 },
				desc: 'Chiến binh Namek thông minh, luôn đóng vai trò là hậu vệ và người hướng dẫn cho các chiến binh Z.',
				skills: [
					{ name: 'Đấm Ma Tốc', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ma Xuyên Quang Sát Pháo', chance: 40, desc: 'Tia năng lượng xuyên phá, gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Phòng Thủ Tối Ưu', chance: 40, desc: 'Tăng 40% Phòng thủ cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.4, duration: 5 } }
				]
			},
			'c064': {
				name: 'Trunks', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Chiến binh đến từ tương lai, sử dụng kiếm và sức mạnh Saiyan để bảo vệ dòng thời gian.',
				skills: [
					{ name: 'Chém Thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bạo Viêm Kích', chance: 40, desc: 'Gây 200% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.0, ignoreDef: 0.15 },
					{ name: 'Kiếm Thuật Tối Cường', chance: 45, desc: 'Chém dứt khoát, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c065': {
				name: 'Saitama', rarity: 5, baseStats: { hp: 110, atk: 9, def: 9, spd: 8, lck: 8 }, potential: { hp: 10, atk: 6, def: 6, spd: 6, lck: 6 },
				desc: 'Người đàn ông mạnh nhất, có thể đánh bại mọi kẻ thù chỉ bằng một cú đấm.',
				skills: [
					{ name: 'Đấm Thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Đấm Nghiêm Túc', chance: 40, desc: 'Cú đấm nghiêm túc, gây 250% sát thương và bỏ qua 30% phòng thủ.', multiplier: 2.5, ignoreDef: 0.3 },
					{ name: 'Liên Hoàn Đấm Thường', chance: 45, desc: 'Tấn công nhiều lần, gây 230% sát thương.', multiplier: 2.3, ignoreDef: 0 }
				]
			},
			'c066': {
				name: 'Genos', rarity: 5, baseStats: { hp: 100, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Cyborg học trò tận tâm của Saitama, chiến đấu bằng các vũ khí năng lượng công nghệ cao.',
				skills: [
					{ name: 'Bắn Năng Lượng', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Pháo Thiêu Đốt', chance: 40, desc: 'Pháo hủy diệt, gây 220% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.2, ignoreDef: 0.2 },
					{ name: 'Tăng Tốc Chiến Đấu', chance: 35, desc: 'Tăng 40% Tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c067': {
				name: 'Tatsumaki', rarity: 5, baseStats: { hp: 95, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Nữ anh hùng cấp S có khả năng điều khiển siêu năng lực mạnh mẽ.',
				skills: [
					{ name: 'Lực Đẩy', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Siêu Năng Lực', chance: 45, desc: 'Tạo sóng xung kích, gây 210% sát thương.', multiplier: 2.1, ignoreDef: 0 },
					{ name: 'Vòng Xoáy', chance: 40, desc: 'Gây 180% sát thương và bỏ qua 25% phòng thủ.', multiplier: 1.8, ignoreDef: 0.25 }
				]
			},
			'c068': {
				name: 'King', rarity: 5, baseStats: { hp: 100, atk: 8, def: 8, spd: 8, lck: 9 }, potential: { hp: 9, atk: 5, def: 5, spd: 5, lck: 6 },
				desc: 'Người được xem là mạnh nhất thế giới, dù thực chất sức mạnh của anh chỉ là sự may mắn và danh tiếng.',
				skills: [
					{ name: 'Nhìn Chằm Chằm', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'King Engine', chance: 40, desc: 'Tăng 50% May mắn trong 5 lượt.', effect: { type: 'buff', stat: 'lck', value: 0.5, duration: 5 } },
					{ name: 'Vô Địch', chance: 45, desc: 'Triệu hồi Saitama ,gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 }
				]
			},
			'c069': {
				name: 'Mumen Rider', rarity: 4, baseStats: { hp: 85, atk: 7, def: 7, spd: 8, lck: 7 }, potential: { hp: 8, atk: 4, def: 4, spd: 5, lck: 4 },
				desc: 'Anh hùng cấp C với tinh thần chính nghĩa bất diệt, luôn chiến đấu vì công lý dù yếu đuối.',
				skills: [
					{ name: 'Đạp Xe Tấn Công', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Justice Crash', chance: 40, desc: 'Lao vào tấn công, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Tinh thần Anh hùng', chance: 35, desc: 'Tăng 30% Phòng thủ cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.3, duration: 5 } }
				]
			},
			'c070': {
				name: 'Eren', rarity: 5, baseStats: { hp: 110, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 10, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Thành viên đội Trinh Sát với khả năng biến hình thành Titan Tiến Công và Titan Sáng Lập.',
				skills: [
					{ name: 'Chém Đơn', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Cuồng Nộ', chance: 40, desc: 'Gây 200% sát thương và bỏ qua 10% phòng thủ.', multiplier: 2.0, ignoreDef: 0.1 },
					{ name: 'Titan Tiến Công', chance: 45, desc: 'Biến hình, gây 230% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.3, ignoreDef: 0.2 }
				]
			},
			'c071': {
				name: 'Mikasa', rarity: 5, baseStats: { hp: 95, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Nữ chiến binh xuất sắc nhất của đội Trinh Sát với tốc độ và kỹ năng chiến đấu vượt trội.',
				skills: [
					{ name: 'Chém Đơn', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Chém Gáy Titan', chance: 45, desc: 'Gây 210% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.1, ignoreDef: 0.15 },
					{ name: 'Tốc độ 3D', chance: 35, desc: 'Tăng 40% Tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c072': {
				name: 'Levi', rarity: 5, baseStats: { hp: 100, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 6, def: 5, spd: 6, lck: 5 },
				desc: 'Đội trưởng binh trưởng mạnh nhất nhân loại, nổi tiếng với khả năng tiêu diệt Titan nhanh và chính xác.',
				skills: [
					{ name: 'Chém Nhanh', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Chém Xoáy', chance: 40, desc: 'Tấn công liên hoàn, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Tốc độ Ánh Sáng', chance: 35, desc: 'Tăng 50% Tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.5, duration: 5 } }
				]
			},
			'c073': {
				name: 'Armin', rarity: 4, baseStats: { hp: 85, atk: 7, def: 7, spd: 7, lck: 8 }, potential: { hp: 8, atk: 4, def: 4, spd: 4, lck: 5 },
				desc: 'Nhà chiến lược xuất sắc của đội Trinh Sát, sử dụng trí tuệ để xoay chuyển tình thế trận chiến.',
				skills: [
					{ name: 'Chém Đơn', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Chiến Thuật', chance: 35, desc: 'Giảm 40% Phòng thủ của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'def', value: -0.4, duration: 5 } },
					{ name: 'Kế Hoạch Bất Ngờ', chance: 40, desc: 'Lập kế hoạch tác chiến, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 }
				]
			},
			'c074': {
				name: 'Erwin', rarity: 4, baseStats: { hp: 95, atk: 8, def: 8, spd: 7, lck: 8 }, potential: { hp: 8, atk: 5, def: 5, spd: 4, lck: 5 },
				desc: 'Chỉ huy đội Trinh Sát, người truyền cảm hứng với khả năng lãnh đạo và sẵn sàng hy sinh vì nhân loại.',
				skills: [
					{ name: 'Đột Kích', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hi Sinh', chance: 40, desc: 'Tăng 40% Tấn công cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } },
					{ name: 'Dẫn Đầu Trinh Sát', chance: 45, desc: 'Tấn công bất ngờ, gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 }
				]
			},
			'c075': {
				name: 'Seiya', rarity: 5, baseStats: { hp: 105, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 10, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Thánh đấu sĩ Thiên Mã, luôn chiến đấu với tinh thần rực cháy và sức mạnh Cosmo vô hạn.',
				skills: [
					{ name: 'Cú Đấm Cosmo', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thiên Mã Lưu Tinh Quyền', chance: 40, desc: 'Cú đấm tốc độ ánh sáng, gây 230% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.3, ignoreDef: 0.2 },
					{ name: 'Cosmo Rực Cháy', chance: 35, desc: 'Tăng 40% Tấn công trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } }
				]
			},
			'c076': {
				name: 'Shiryu', rarity: 5, baseStats: { hp: 110, atk: 9, def: 9, spd: 8, lck: 8 }, potential: { hp: 10, atk: 5, def: 6, spd: 5, lck: 5 },
				desc: 'Thánh đấu sĩ Rồng, nổi tiếng với chiếc khiên bất khả xâm phạm và cú đấm rồng mạnh mẽ.',
				skills: [
					{ name: 'Lực Rồng', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thăng Long Bá', chance: 40, desc: 'Cú đấm rồng bay, gây 230% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.3, ignoreDef: 0.15 },
					{ name: 'Kháng Long Bá', chance: 45, desc: 'Gây 210% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.1, ignoreDef: 0.25 }
				]
			},
			'c077': {
				name: 'Hyoga', rarity: 4, baseStats: { hp: 90, atk: 8, def: 8, spd: 8, lck: 7 }, potential: { hp: 8, atk: 5, def: 5, spd: 5, lck: 4 },
				desc: 'Thánh đấu sĩ Thiên Nga, sử dụng sức mạnh băng lạnh để đóng băng kẻ thù.',
				skills: [
					{ name: 'Cú Đấm Băng', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bụi Kim Cương', chance: 45, desc: 'Gây 190% sát thương và bỏ qua 20% phòng thủ.', multiplier: 1.9, ignoreDef: 0.2 },
					{ name: 'Thiên Nga Nổi Giận', chance: 40, desc: 'Tấn công băng lạnh, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 }
				]
			},
			'c078': {
				name: 'Shun', rarity: 4, baseStats: { hp: 85, atk: 7, def: 7, spd: 8, lck: 8 }, potential: { hp: 8, atk: 4, def: 4, spd: 5, lck: 5 },
				desc: 'Thánh đấu sĩ Tiên Nữ, sử dụng dây xích tinh vân để tấn công và phòng thủ.',
				skills: [
					{ name: 'Roi Tinh Vân', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Xích Tinh Vân', chance: 40, desc: 'Gây 180% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.8, ignoreDef: 0.15 },
					{ name: 'Dòng Khí Tinh Vân', chance: 35, desc: 'Giảm 30% Tấn công của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.3, duration: 5 } }
				]
			},
			'c079': {
				name: 'Ikki', rarity: 5, baseStats: { hp: 105, atk: 9, def: 9, spd: 9, lck: 8 }, potential: { hp: 10, atk: 5, def: 6, spd: 6, lck: 5 },
				desc: 'Thánh đấu sĩ Phượng Hoàng, người có khả năng tự phục hồi và sức mạnh của lửa Phượng Hoàng.',
				skills: [
					{ name: 'Cú Đấm Lửa', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ảo Giác Phượng Hoàng', chance: 40, desc: 'Đòn đánh tinh thần, gây 220% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.2, ignoreDef: 0.2 },
					{ name: 'Cánh Phượng Hoàng Tung Bay', chance: 45, desc: 'Phượng hoàng bay, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 }
				]
			},
			'c080': {
				name: 'Saber', rarity: 5, baseStats: { hp: 110, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 10, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Linh Hồn Anh Hùng thuộc lớp Saber, là Vua Arthur với thanh thánh kiếm Excalibur huyền thoại.',
				skills: [
					{ name: 'Kiếm Thuật Cơ Bản', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Excalibur', chance: 40, desc: 'Thánh kiếm ánh sáng, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Phong Vương', chance: 35, desc: 'Tăng 40% Tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c081': {
				name: 'Archer', rarity: 5, baseStats: { hp: 100, atk: 9, def: 8, spd: 9, lck: 9 }, potential: { hp: 9, atk: 5, def: 5, spd: 6, lck: 6 },
				desc: 'Linh Hồn Anh Hùng thuộc lớp Archer, nổi tiếng với khả năng tạo ra kiếm và Unlimited Blade Works.',
				skills: [
					{ name: 'Bắn Cung Thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Unlimited Blade Works', chance: 40, desc: 'Tấn công đa mục tiêu, gây 220% sát thương.', multiplier: 2.2, ignoreDef: 0 },
					{ name: 'Caladbolg II', chance: 45, desc: 'Bắn cung nổ, gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 }
				]
			},
			'c082': {
				name: 'Rin', rarity: 4, baseStats: { hp: 85, atk: 8, def: 7, spd: 8, lck: 8 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 5 },
				desc: 'Nữ pháp sư tài năng, người sử dụng viên ngọc ma thuật làm vũ khí chính.',
				skills: [
					{ name: 'Viên Ngọc Ma Thuật', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ngọc Kiếm', chance: 40, desc: 'Gây 200% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.0, ignoreDef: 0.2 },
					{ name: 'Gandr', chance: 45, desc: 'Gây 180% sát thương và bỏ qua 15% phòng thủ.', multiplier: 1.8, ignoreDef: 0.15 }
				]
			},
			'c083': {
				name: 'Shirou', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 7, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 4, lck: 4 },
				desc: 'Học viên ma thuật với khả năng nhân bản và phóng chiếu kiếm.',
				skills: [
					{ name: 'Chém Kiếm Nhân Bản', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phóng Chiếu Ma Thuật', chance: 45, desc: 'Tạo kiếm tấn công, gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
					{ name: 'Cường Hóa', chance: 35, desc: 'Tăng 30% Tấn công trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.3, duration: 5 } }
				]
			},
			'c084': {
				name: 'Gilgamesh', rarity: 5, baseStats: { hp: 110, atk: 9, def: 8, spd: 9, lck: 9 }, potential: { hp: 10, atk: 6, def: 5, spd: 5, lck: 6 },
				desc: 'Vua Anh Hùng, sở hữu toàn bộ nguyên mẫu của các bảo vật thông qua Cổng Babylon.',
				skills: [
					{ name: 'Tấn Công Thô Bạo', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Cổng Babylon', chance: 40, desc: 'Phóng vũ khí, gây 230% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.3, ignoreDef: 0.2 },
					{ name: 'Khúc Ca Sáng Thế', chance: 45, desc: 'Sử dụng Ea, gây 220% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.2, ignoreDef: 0.25 }
				]
			},
			'c085': {
				name: 'Adam', rarity: 5, baseStats: { hp: 105, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 10, atk: 5, def: 5, spd: 6, lck: 5 },
				desc: 'Thủy tổ của nhân loại, có khả năng sao chép mọi đòn tấn công của thần linh.',
				skills: [
					{ name: 'Đấm Tốc Độ', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Đôi Mắt Của Thần', chance: 40, desc: 'Phản đòn, gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Đấm Liên Hoàn', chance: 45, desc: 'Tấn công nhanh, gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 }
				]
			},
			'c086': {
				name: 'Zeus', rarity: 5, baseStats: { hp: 110, atk: 9, def: 8, spd: 9, lck: 9 }, potential: { hp: 10, atk: 6, def: 5, spd: 6, lck: 5 },
				desc: 'Thần tối cao của Olympus, nổi tiếng với sức mạnh vật lý và tốc độ không tưởng.',
				skills: [
					{ name: 'Đấm Trời Giáng', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Cú Đấm Vượt Thời Gian', chance: 40, desc: 'Cú đấm vượt thời gian, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Adamās', chance: 35, desc: 'Tăng 40% Tấn công trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.4, duration: 5 } }
				]
			},
			'c087': {
				name: 'Thor', rarity: 5, baseStats: { hp: 110, atk: 9, def: 9, spd: 8, lck: 8 }, potential: { hp: 10, atk: 6, def: 6, spd: 5, lck: 5 },
				desc: 'Thần Sấm Bắc Âu, chiến đấu bằng cây búa Mjolnir cực mạnh.',
				skills: [
					{ name: 'Đánh Búa Thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Geirröd', chance: 40, desc: 'Búa Mjolnir tấn công, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Búa Thor', chance: 45, desc: 'Đòn đánh mạnh, gây 210% sát thương.', multiplier: 2.1, ignoreDef: 0 }
				]
			},
			'c088': {
				name: 'Lữ Bố', rarity: 5, baseStats: { hp: 105, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 10, atk: 6, def: 5, spd: 6, lck: 5 },
				desc: 'Chiến thần mạnh nhất của nhân loại, sử dụng kích Phương Thiên Họa Kích huyền thoại.',
				skills: [
					{ name: 'Kích Chém Thường', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phá Thiên Nhất Kích', chance: 40, desc: 'Phá Thiên Nhất Kích, gây 220% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.2, ignoreDef: 0.2 },
					{ name: 'Cưỡi Xích Thố', chance: 35, desc: 'Tăng 40% Tốc độ trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.4, duration: 5 } }
				]
			},
			'c089': {
				name: 'Brunhilde', rarity: 5, baseStats: { hp: 95, atk: 9, def: 8, spd: 9, lck: 9 }, potential: { hp: 9, atk: 5, def: 5, spd: 6, lck: 6 },
				desc: 'Valkyrie tối cao, người đứng ra thách thức các vị thần bằng trận chiến Ragnarok.',
				skills: [
					{ name: 'Thao Túng', chance: 0, desc: 'Tấn công thường, gây 100% sát thương.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ragnarok', chance: 40, desc: 'Dùng lý lẽ gây ra thảm họa Ragnarok, gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Trí Tuệ Valkyrie', chance: 35, desc: 'Giảm 40% Phòng thủ của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'def', value: -0.4, duration: 5 } }
				]
			},
			'c090': {
				name: 'Maruko', rarity: 1, baseStats: { hp: 70, atk: 4, def: 5, spd: 5, lck: 5 }, potential: { hp: 6, atk: 2, def: 2, spd: 2, lck: 2 },
				desc: 'Cô bé học sinh tiểu học tinh nghịch và lười biếng, thường xuyên gây rắc rối cho gia đình.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Khóc Lóc', chance: 45, desc: 'Tấn công gây 130% sát thương.', multiplier: 1.3, ignoreDef: 0 },
					{ name: 'Mộng Mơ', chance: 35, desc: 'Tăng 20% May mắn (LCK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'lck', value: 0.20, duration: 5 } }
				]
			},
			'c091': {
				name: 'Tamae', rarity: 1, baseStats: { hp: 75, atk: 4, def: 6, spd: 6, lck: 5 }, potential: { hp: 7, atk: 2, def: 3, spd: 3, lck: 2 },
				desc: 'Người bạn thân nhất của Maruko, cô bé hiền lành và chăm học.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hỗ Trợ Bạn Bè', chance: 35, desc: 'Tăng 10% Phòng thủ (DEF) trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.10, duration: 5 } },
					{ name: 'Ghi Chú Bài Tập', chance: 40, desc: 'Gây 110% sát thương.', multiplier: 1.1, ignoreDef: 0 }
				]
			},
			'c092': {
				name: 'Hanawa', rarity: 1, baseStats: { hp: 70, atk: 5, def: 5, spd: 5, lck: 5 }, potential: { hp: 6, atk: 2, def: 2, spd: 2, lck: 2 },
				desc: 'Cậu bé nhà giàu hào phóng và lãng tử trong lớp của Maruko.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ném Hoa Hồng', chance: 45, desc: 'Gây 140% sát thương.', multiplier: 1.4, ignoreDef: 0 },
					{ name: 'Tiền Tiêu Vặt', chance: 30, desc: 'Tăng 15% Tấn công (ATK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.15, duration: 5 } }
				]
			},
			'c093': {
				name: 'Nagasawa', rarity: 1, baseStats: { hp: 85, atk: 4, def: 5, spd: 5, lck: 5 }, potential: { hp: 9, atk: 2, def: 2, spd: 2, lck: 2 },
				desc: 'Cậu bé với khuôn mặt hay mếu và dễ khóc nhè trong lớp.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Mặt Mếu', chance: 40, desc: 'Gây 120% sát thương.', multiplier: 1.2, ignoreDef: 0 },
					{ name: 'Khóc Nhè', chance: 35, desc: 'Giảm 10% Tấn công (ATK) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.1, duration: 5 } }
				]
			},
			'c094': {
				name: 'Ông nội Tomozo', rarity: 1, baseStats: { hp: 70, atk: 4, def: 5, spd: 4, lck: 5 }, potential: { hp: 6, atk: 1, def: 2, spd: 1, lck: 2 },
				desc: 'Ông nội của Maruko, thường bị xúc động và làm thơ.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ngâm Thơ', chance: 35, desc: 'Tăng 10% Phòng thủ (DEF) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.1, duration: 5 } },
					{ name: 'Tình Yêu Bao La', chance: 45, desc: 'Gây 120% sát thương.', multiplier: 1.2, ignoreDef: 0 },
				]
			},

			'c095': {
				name: 'Sakuragi Hanamichi', rarity: 2, baseStats: { hp: 80, atk: 6, def: 6, spd: 6, lck: 4 }, potential: { hp: 7, atk: 3, def: 3, spd: 3, lck: 3 },
				desc: 'Thiên tài bóng rổ với mái tóc đỏ, nổi tiếng với khả năng bật nhảy và tính cách nóng nảy.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Đập Bóng', chance: 45, desc: 'Gây 160% sát thương.', multiplier: 1.6, ignoreDef: 0 },
					{ name: 'Nắm Đấm Thiên Tài', chance: 35, desc: 'Giảm 15% Phòng thủ (DEF) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'def', value: -0.15, duration: 5 } }
				]
			},
			'c096': {
				name: 'Rukawa Kaede', rarity: 2, baseStats: { hp: 70, atk: 6, def: 4, spd: 6, lck: 4 }, potential: { hp: 6, atk: 3, def: 1, spd: 3, lck: 1 },
				desc: 'Cầu thủ ngôi sao lạnh lùng, tài năng và luôn đối đầu với Sakuragi.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Cú Ném Trúng Đích', chance: 50, desc: 'Gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 },
					{ name: 'Dribble Tốc Độ', chance: 30, desc: 'Tăng 15% Tốc độ (SPD) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.15, duration: 5 } }
				]
			},
			'c097': {
				name: 'Akagi Takenori', rarity: 2, baseStats: { hp: 80, atk: 6, def: 6, spd: 4, lck: 4 }, potential: { hp: 7, atk: 3, def: 3, spd: 1, lck: 1 },
				desc: 'Đội trưởng đội bóng rổ Shohoku, nổi tiếng với biệt danh "Gorilla" và khả năng phòng thủ mạnh mẽ.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Chắn Bóng', chance: 35, desc: 'Tăng 20% Phòng thủ (DEF) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.2, duration: 5 } },
					{ name: 'Cú Đúp Đập Mạnh', chance: 40, desc: 'Gây 150% sát thương và bỏ qua 10% phòng thủ.', multiplier: 1.5, ignoreDef: 0.1 }
				]
			},
			'c098': {
				name: 'Mitsui Hisashi', rarity: 2, baseStats: { hp: 70, atk: 6, def: 4, spd: 6, lck: 4 }, potential: { hp: 6, atk: 3, def: 1, spd: 3, lck: 1 },
				desc: 'Cựu cầu thủ MVP trung học, nổi tiếng với khả năng ném 3 điểm xuất sắc.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Cú Ném 3 Điểm', chance: 45, desc: 'Gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 },
					{ name: 'Kỹ Năng Hồi Phục', chance: 30, desc: 'Tăng 15% Tấn công (ATK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.15, duration: 5 } }
				]
			},
			'c099': {
				name: 'Kogure Kiminobu', rarity: 2, baseStats: { hp: 70, atk: 4, def: 4, spd: 4, lck: 4 }, potential: { hp: 6, atk: 1, def: 1, spd: 1, lck: 1 },
				desc: 'Phó đội trưởng hiền lành và là người gắn kết tinh thần đội bóng Shohoku.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Tinh Thần Bền Bỉ', chance: 45, desc: 'Gây 170% sát thương.', multiplier: 1.7, ignoreDef: 0 },
					{ name: 'Chuyền Bóng Chiến Thuật', chance: 30, desc: 'Giảm 10% Tốc độ (SPD) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'spd', value: -0.1, duration: 5 } }
				]
			},

			'c100': {
				name: 'Subaru', rarity: 3, baseStats: { hp: 90, atk: 5, def: 5, spd: 5, lck: 7 }, potential: { hp: 8, atk: 2, def: 2, spd: 2, lck: 4 },
				desc: 'Nhân vật chính bị dịch chuyển đến thế giới khác với khả năng "Trở Về Từ Cõi Chết".',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phòng Thủ Tuyệt Vọng', chance: 35, desc: 'Tăng 30% Phòng thủ (DEF) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.30, duration: 5 } },
					{ name: 'Trở Về Từ Cõi Chết', chance: 45, desc: 'Tấn công gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
				]
			},
			'c101': {
				name: 'Emilia', rarity: 3, baseStats: { hp: 90, atk: 7, def: 5, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 2, spd: 4, lck: 4 },
				desc: 'Nàng tiên lai với mái tóc bạc, sử dụng phép thuật băng và có tính cách nhân hậu.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Bão Tuyết Ma Thuật', chance: 45, desc: 'Gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
					{ name: 'Phép Thuật Băng', chance: 35, desc: 'Giảm 15% Tốc độ (SPD) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'spd', value: -0.15, duration: 5 } }
				]
			},
			'c102': {
				name: 'Rem', rarity: 3, baseStats: { hp: 90, atk: 7, def: 7, spd: 7, lck: 5 }, potential: { hp: 8, atk: 4, def: 4, spd: 4, lck: 2 },
				desc: 'Hầu gái quỷ với khả năng chiến đấu mạnh mẽ, luôn hết lòng vì Subaru.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Demon Mode', chance: 45, desc: 'Gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
					{ name: 'Chùy Gai', chance: 35, desc: 'Giảm 15% Phòng thủ (DEF) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'def', value: -0.15, duration: 5 } }
				]
			},
			'c103': {
				name: 'Ram', rarity: 3, baseStats: { hp: 80, atk: 7, def: 5, spd: 7, lck: 5 }, potential: { hp: 7, atk: 4, def: 2, spd: 4, lck: 2 },
				desc: 'Chị em sinh đôi của Rem, giỏi phép thuật gió và có tính cách kiêu ngạo.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Phép Thuật Gió', chance: 40, desc: 'Gây 180% sát thương.', multiplier: 1.8, ignoreDef: 0 },
					{ name: 'Sức Mạnh Oni', chance: 30, desc: 'Tăng 20% Tấn công (ATK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.20, duration: 5 } }
				]
			},
			'c104': {
				name: 'Reinhard', rarity: 3, baseStats: { hp: 90, atk: 7, def: 7, spd: 7, lck: 7 }, potential: { hp: 8, atk: 4, def: 4, spd: 4, lck: 4 },
				desc: 'Anh hùng mạnh nhất của vương quốc, sở hữu vô số Phù Hộ Thần Thánh.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Divine Protection', chance: 45, desc: 'Gây 190% sát thương.', multiplier: 1.9, ignoreDef: 0 },
					{ name: 'Kiếm Thuật Thần Thánh', chance: 35, desc: 'Tăng 15% Tấn công (ATK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.15, duration: 5 } }
				]
			},

			'c105': {
				name: 'Tanjiro', rarity: 4, baseStats: { hp: 110, atk: 8, def: 7, spd: 7, lck: 7 }, potential: { hp: 9, atk: 5, def: 4, spd: 4, lck: 4 },
				desc: 'Kiếm sĩ diệt quỷ với Hơi Thở Nước và Vũ Điệu Hỏa Thần, luôn tìm cách cứu em gái.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Vũ Điệu Hỏa Thần', chance: 45, desc: 'Gây 210% sát thương và bỏ qua 15% phòng thủ.', multiplier: 2.1, ignoreDef: 0.15 },
					{ name: 'Hơi Thở Nước', chance: 30, desc: 'Tăng 20% Phòng thủ (DEF) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.2, duration: 5 } }
				]
			},
			'c106': {
				name: 'Nezuko', rarity: 4, baseStats: { hp: 110, atk: 8, def: 8, spd: 7, lck: 7 }, potential: { hp: 9, atk: 5, def: 5, spd: 4, lck: 4 },
				desc: 'Em gái của Tanjiro, bị biến thành quỷ nhưng vẫn giữ được ý thức và chiến đấu bên cạnh anh trai.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Huyết Quỷ Thuật', chance: 45, desc: 'Gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 },
					{ name: 'Sức Mạnh Quỷ', chance: 35, desc: 'Giảm 10% Tấn công (ATK) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.1, duration: 5 } }
				]
			},
			'c107': {
				name: 'Zenitsu', rarity: 4, baseStats: { hp: 90, atk: 8, def: 7, spd: 8, lck: 8 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 5 },
				desc: 'Kiếm sĩ sợ hãi nhưng lại cực mạnh khi ngủ, sử dụng Hơi Thở Sấm Sét.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hơi Thở Của Sấm: Nhất Thức', chance: 40, desc: 'Gây 210% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.1, ignoreDef: 0.2 },
					{ name: 'Ngủ Say', chance: 30, desc: 'Tăng 20% Tốc độ (SPD) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'spd', value: 0.2, duration: 5 } }
				]
			},
			'c108': {
				name: 'Inosuke', rarity: 4, baseStats: { hp: 100, atk: 8, def: 7, spd: 8, lck: 7 }, potential: { hp: 8, atk: 5, def: 4, spd: 5, lck: 4 },
				desc: 'Kiếm sĩ đội mũ lợn rừng, sử dụng Hơi Thở Dã Thú và có tính cách nóng nảy.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hơi Thở Dã Thú', chance: 45, desc: 'Gây 200% sát thương và bỏ qua 10% phòng thủ.', multiplier: 2.0, ignoreDef: 0.1 },
					{ name: 'Khám Phá Địa Hình', chance: 30, desc: 'Tăng 20% May mắn (LCK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'lck', value: 0.20, duration: 5 } }
				]
			},
			'c109': {
				name: 'Giyu Tomioka', rarity: 4, baseStats: { hp: 110, atk: 8, def: 8, spd: 7, lck: 7 }, potential: { hp: 9, atk: 5, def: 5, spd: 4, lck: 4 },
				desc: 'Thủy Trụ điềm tĩnh và mạnh mẽ, sử dụng Hơi Thở Nước.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hơi Thở Của Nước: Thập Nhất Thức', chance: 45, desc: 'Gây 200% sát thương.', multiplier: 2.0, ignoreDef: 0 },
					{ name: 'Tĩnh Lặng', chance: 35, desc: 'Giảm 15% Tấn công (ATK) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.15, duration: 5 } }
				]
			},

			'c110': {
				name: 'Ainz Ooal Gown', rarity: 5, baseStats: { hp: 130, atk: 9, def: 9, spd: 8, lck: 9 }, potential: { hp: 10, atk: 6, def: 6, spd: 5, lck: 6 },
				desc: 'Chúa tể bất tử của Đại Lăng Tẩm Nazarick, người sử dụng phép thuật tối cao.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Thế Giới Khác', chance: 45, desc: 'Gây 230% sát thương và bỏ qua 25% phòng thủ.', multiplier: 2.3, ignoreDef: 0.25 },
					{ name: 'Phép Thuật Cấp Cao', chance: 35, desc: 'Tăng 25% Tấn công (ATK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.25, duration: 5 } }
				]
			},
			'c111': {
				name: 'Albedo', rarity: 5, baseStats: { hp: 120, atk: 9, def: 9, spd: 8, lck: 8 }, potential: { hp: 10, atk: 6, def: 6, spd: 5, lck: 5 },
				desc: 'Giám sát viên của các Hộ Vệ Tầng, sở hữu khả năng phòng thủ tuyệt vời.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Kháng Cự Tuyệt Đối', chance: 40, desc: 'Tăng 30% Phòng thủ (DEF) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'def', value: 0.30, duration: 5 } },
					{ name: 'Thương Gae Bolg', chance: 40, desc: 'Gây 220% sát thương.', multiplier: 2.2, ignoreDef: 0 }
				]
			},
			'c112': {
				name: 'Shalltear', rarity: 5, baseStats: { hp: 115, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 6, def: 5, spd: 6, lck: 5 },
				desc: 'Hộ Vệ Tầng 1-3, ma cà rồng với khả năng chiến đấu cực kỳ mạnh mẽ.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Khát Máu', chance: 40, desc: 'Gây 230% sát thương.', multiplier: 2.3, ignoreDef: 0 },
					{ name: 'Thương Ma Cà Rồng', chance: 30, desc: 'Giảm 20% Tấn công (ATK) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'atk', value: -0.2, duration: 5 } }
				]
			},
			'c113': {
				name: 'Demiurge', rarity: 5, baseStats: { hp: 110, atk: 9, def: 8, spd: 9, lck: 8 }, potential: { hp: 9, atk: 6, def: 5, spd: 6, lck: 5 },
				desc: 'Hộ Vệ Tầng 7, thiên tài chiến lược với vẻ ngoài lịch thiệp nhưng độc ác.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Ngọn Lửa Địa Ngục', chance: 40, desc: 'Gây 220% sát thương và bỏ qua 20% phòng thủ.', multiplier: 2.2, ignoreDef: 0.2 },
					{ name: 'Thao Túng Ý Chí', chance: 30, desc: 'Giảm 20% Tốc độ (SPD) của đối thủ trong 5 lượt.', effect: { type: 'debuff', stat: 'spd', value: -0.2, duration: 5 } }
				]
			},
			'c114': {
				name: 'Cocytus', rarity: 5, baseStats: { hp: 110, atk: 8, def: 8, spd: 8, lck: 8 }, potential: { hp: 9, atk: 5, def: 5, spd: 5, lck: 5 },
				desc: 'Hộ Vệ Tầng 5, chiến binh côn trùng với khả năng chiến đấu bằng kiếm và băng giá.',
				skills: [
					{ name: 'Tấn Công Thường', chance: 0, desc: 'Tấn công gây 100% sát thương cơ bản.', multiplier: 1, ignoreDef: 0 },
					{ name: 'Hơi Thở Lạnh Giá', chance: 45, desc: 'Gây 230% sát thương.', multiplier: 2.3, ignoreDef: 0 },
					{ name: 'Kiếm Băng', chance: 35, desc: 'Tăng 20% Tấn công (ATK) cho bản thân trong 5 lượt.', effect: { type: 'buff', stat: 'atk', value: 0.2, duration: 5 } }
				]
			},
		};
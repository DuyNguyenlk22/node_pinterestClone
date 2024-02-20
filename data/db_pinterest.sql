/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `anh_dinh_kem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `hinh_id` int NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  PRIMARY KEY (`hinh_id`,`nguoi_dung_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `anh_dinh_kem`) VALUES
(1, 1, 5, '2023-01-15', 'Great photo!', NULL);
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `anh_dinh_kem`) VALUES
(2, 8, 5, '2023-02-20', 'Amazing shot!', NULL);
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `anh_dinh_kem`) VALUES
(3, 3, 14, '2023-03-25', 'Love the composition!', NULL);
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `anh_dinh_kem`) VALUES
(4, 11, 11, '2023-04-10', 'Beautiful scenery!', NULL),
(5, 6, 1, '2023-05-05', 'Wow, stunning!', NULL),
(6, 17, 7, '2023-06-12', 'Incredible capture!', NULL),
(7, 2, 16, '2023-07-18', 'Fantastic view!', NULL),
(8, 13, 9, '2023-08-22', 'Impressive photo!', NULL),
(9, 9, 18, '2023-09-30', 'Captivating moment!', NULL),
(10, 10, 19, '2023-10-08', 'Awesome shot!', NULL),
(11, 15, 20, '2023-11-14', 'Beautifully captured!', NULL),
(12, 14, 14, '2023-12-19', 'Great perspective!', NULL),
(13, 4, 2, '2024-01-02', 'Lovely photo!', NULL),
(14, 16, 3, '2024-02-08', 'Wonderful composition!', NULL),
(15, 5, 12, '2024-03-14', 'Fantastic work!', NULL),
(16, 12, 10, '2024-04-20', 'Incredible moment!', NULL),
(17, 7, 13, '2024-05-26', 'Breathtaking!', NULL),
(18, 20, 8, '2024-06-30', 'Absolutely stunning!', NULL),
(19, 19, 15, '2024-07-04', 'Impressive shot!', NULL),
(20, 18, 4, '2024-08-10', 'Beautiful scenery!', NULL),
(21, 1, 41, '2023-01-15', 'Great capture!', NULL),
(22, 8, 42, '2023-02-20', 'Amazing scenery!', NULL),
(23, 3, 43, '2023-03-25', 'Impressive shot!', NULL),
(24, 11, 44, '2023-04-10', 'Beautiful composition!', NULL),
(25, 6, 45, '2023-05-05', 'Wow, stunning view!', NULL),
(26, 17, 46, '2023-06-12', 'Fantastic photo!', NULL),
(27, 2, 47, '2023-07-18', 'Incredible moment!', NULL),
(28, 13, 48, '2023-08-22', 'Captivating scene!', NULL),
(29, 9, 49, '2023-09-30', 'Lovely shot!', NULL),
(30, 10, 50, '2023-10-08', 'Awesome perspective!', NULL),
(31, 15, 41, '2023-11-14', 'Beautifully captured!', NULL),
(32, 14, 42, '2023-12-19', 'Great shot!', NULL),
(33, 4, 43, '2024-01-02', 'Lovely photo!', NULL),
(34, 16, 44, '2024-02-08', 'Wonderful composition!', NULL),
(35, 5, 45, '2024-03-14', 'Fantastic work!', NULL),
(36, 12, 46, '2024-04-20', 'Incredible moment!', NULL),
(37, 7, 47, '2024-05-26', 'Breathtaking!', NULL),
(38, 20, 48, '2024-06-30', 'Absolutely stunning!', NULL),
(39, 19, 49, '2024-07-04', 'Impressive shot!', NULL),
(40, 18, 50, '2024-08-10', 'Beautiful scenery!', NULL),
(41, 22, 1, '2023-12-25', '123', NULL),
(42, 22, 1, '2023-12-25', '123', NULL),
(43, 22, 1, '2023-12-25', '123', NULL),
(44, 22, 1, '2023-12-25', '123', '/public/img/comment/1703521701405_05.jpg'),
(46, 22, 1, '2023-12-26', '123', '1703552723209_meo.jpg'),
(47, 22, 1, '2023-12-26', 'hjdsfkjsdkjfhkjdshfkjdshjkf', '/public/img/comment/1703579536911_05.jpg'),
(51, 28, 1, '2024-02-05', '123', NULL),
(69, 28, 1, '2024-02-05', 'con mèo', NULL),
(70, 28, 64, '2024-02-05', 'giày đẹp quá', NULL),
(71, 28, 22, '2024-02-17', 'Beautifullll !', NULL),
(72, 24, 12, '2024-02-19', 'Đẹp thế nhờ', NULL),
(73, 24, 31, '2024-02-20', 'nice cat', NULL);

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Nature1', 'https://i.pinimg.com/736x/c1/7d/fd/c17dfd78bd446e3da742212566411f95.jpg', 'Beautiful landscape with mountains and trees', 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'VacationPic1', 'https://i.pinimg.com/564x/89/fb/94/89fb94cc90c8e3ac798959c246220a2b.jpg', 'Enjoying the beach during summer vacation', 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'Cityscape2', 'https://i.pinimg.com/236x/43/59/9b/43599b0be7311dc61216f80cc2e929fa.jpg', 'A stunning view of the city skyline at night', 3);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'FamilyPic1', 'https://i.pinimg.com/236x/d7/7c/75/d77c7561b7137e999499e6f1f3033859.jpg', 'Gathering with family for a special occasion', 4),
(5, 'Adventure2', 'https://i.pinimg.com/236x/0d/24/0c/0d240ca5390c8509bdd38bff6893ed87.jpg', 'Thrilling adventure with friends in the wilderness', 5),
(6, 'Portrait1', 'https://i.pinimg.com/236x/d0/3f/28/d03f28b5b8bf837b31b2ddffa6f47c6d.jpg', 'Artistic portrait with unique lighting', 6),
(7, 'Event3', 'https://i.pinimg.com/236x/79/d3/d8/79d3d81d6a40208887b7e27cf49eb033.jpg', 'Capturing memories from a joyful event', 7),
(8, 'SunsetPic', 'https://i.pinimg.com/236x/7a/24/73/7a24738c5a761f679a98fbd66246019b.jpg', 'Breathtaking sunset by the ocean', 8),
(9, 'Travel4', 'https://i.pinimg.com/236x/9e/3b/de/9e3bde1359c5528fb06e67c0d8c65ce4.jpg', 'Exploring new cultures and landmarks', 9),
(10, 'PetPic2', 'https://i.pinimg.com/236x/94/b3/4e/94b34ee338cb3a625dda8ad6ca76acc6.jpg', 'Adorable pet enjoying a sunny day', 10),
(11, 'FashionShoot', 'https://i.pinimg.com/236x/30/3a/2f/303a2f77010c847460e4c2d283c1a8ec.jpg', 'Stylish fashion photoshoot with vibrant colors', 11),
(12, 'FoodiePic1', 'https://i.pinimg.com/236x/84/a6/1b/84a61b6797fa8efa95eaf62b2bfab80e.jpg', 'Delicious and beautifully presented culinary creation', 12),
(13, 'Concert2', 'https://i.pinimg.com/236x/0a/e8/89/0ae889a9fc207f19941c7cd62ea6cb2d.jpg', 'Vibrant atmosphere at a live music concert', 13),
(14, 'ArtExhibit', 'https://i.pinimg.com/236x/9f/ac/78/9fac7808040e14ca7e20aa56ba0604f9.jpg', 'Exploring an art exhibit with fascinating pieces', 14),
(15, 'FitnessPic', 'https://i.pinimg.com/236x/9f/74/68/9f7468fa70b8d44aaa9b66c348fd0d8f.jpg', 'Dedicated fitness routine for a healthy lifestyle', 15),
(16, 'TechEvent', 'https://i.pinimg.com/236x/d6/1f/89/d61f89c4f69346a12c77f84c218d5303.jpg', 'Engaging in a tech event with innovative products', 16),
(17, 'GamingSession', 'https://i.pinimg.com/236x/d2/72/1b/d2721bb1cd36a99166c5c11532538abe.jpg', 'Fun and excitement during a gaming session', 17),
(18, 'Celebration5', 'https://i.pinimg.com/236x/e2/12/92/e2129280999346015cee4826a72219c9.jpg', 'Celebrating achievements and milestones', 18),
(19, 'HolidayPic', 'https://i.pinimg.com/236x/97/41/5a/97415ad5948480a262aba83f64980a62.jpg', 'Festive holiday decorations and spirit', 19),
(20, 'RelaxationPic', 'https://i.pinimg.com/236x/35/38/97/353897e5e1601a2d1c3dd750cd311db5.jpg', 'Peaceful moment of relaxation in nature', 20),
(21, 'Nature1', 'https://i.pinimg.com/236x/7e/af/d7/7eafd7677cb1aad60a4ec2ac6687ca27.jpg', 'Beautiful landscape with mountains and trees', 8),
(22, 'VacationPic1', 'https://i.pinimg.com/236x/ef/b3/44/efb344fb491db6a5b050d69d635daa6d.jpg', 'Enjoying the beach during summer vacation', 14),
(23, 'Cityscape2', 'https://i.pinimg.com/236x/48/0e/d9/480ed98c62e9bd53c9804f41fa259c29.jpg', 'A stunning view of the city skyline at night', 3),
(24, 'FamilyPic1', 'https://i.pinimg.com/236x/0d/5f/fc/0d5ffc3091c0c7bf8cbd9909653af984.jpg', 'Beautiful family moment', 6),
(25, 'Adventure2', 'https://i.pinimg.com/564x/1e/a8/ef/1ea8efebe5baf9a600036ed49537fa66.jpg', 'Thrilling adventure with friends in the wilderness', 11),
(26, 'Portrait1', 'https://i.pinimg.com/236x/13/59/bc/1359bc684e624baadad38917b4700367.jpg', 'Artistic portrait with unique lighting', 19),
(27, 'Event3', 'https://i.pinimg.com/236x/6e/56/40/6e5640253aa07204ccb372aa54e41fa4.jpg', 'Capturing memories from a joyful event', 2),
(28, 'SunsetPic', 'https://i.pinimg.com/236x/6f/67/f2/6f67f2e238e7d9114297354f71a1579e.jpg', 'Breathtaking sunset by the ocean', 17),
(29, 'Travel4', 'https://i.pinimg.com/236x/a3/c8/f9/a3c8f9075dff434b79288164cf6b1ef5.jpg', 'Exploring new cultures and landmarks', 5),
(30, 'PetPic2', 'https://i.pinimg.com/236x/35/cc/39/35cc391688d45c335e374c662d85bd53.jpg', 'Adorable pet enjoying a sunny day', 10),
(31, 'FashionShoot', 'https://i.pinimg.com/236x/d1/6b/be/d16bbefed0f77b74e3ff3a8d1ff056a0.jpg', 'Stylish fashion photoshoot with vibrant colors', 12),
(32, 'FoodiePic1', 'https://i.pinimg.com/236x/3f/cf/9e/3fcf9e40d5fd45ad673c7fc7837c4e38.jpg', 'Delicious and beautifully presented culinary creation', 7),
(33, 'Concert2', 'https://i.pinimg.com/236x/1c/51/fc/1c51fcae1ad60c22fbef7eff958520db.jpg', 'Vibrant atmosphere at a live music concert', 16),
(34, 'ArtExhibit', 'https://i.pinimg.com/236x/8c/52/50/8c52500c6eb2b2c6d6a51be88fb702bc.jpg', 'Exploring an art exhibit with fascinating pieces', 1),
(35, 'FitnessPic', 'https://i.pinimg.com/236x/eb/f7/20/ebf7201d3d9ec4d9010da8e5a3bdb5cf.jpg', 'Dedicated fitness routine for a healthy lifestyle', 9),
(36, 'TechEvent', 'https://i.pinimg.com/236x/4a/a2/36/4aa236a9a745f25e350cbed50af0ddcb.jpg', 'Engaging in a tech event with innovative products', 13),
(37, 'GamingSession', 'https://i.pinimg.com/474x/0f/10/7d/0f107d593ad72fd5cf1a9baf09732e8c.jpg', 'Fun and excitement during a gaming session', 18),
(38, 'Celebration5', 'https://i.pinimg.com/236x/43/16/f0/4316f033211cb352d1522cb5b6012dfd.jpg', 'Celebrating achievements and milestones', 4),
(39, 'HolidayPic', 'https://i.pinimg.com/236x/b6/bf/b9/b6bfb95404fcedbb302772936c804a30.jpg', 'Festive holiday decorations and spirit', 15),
(40, 'RelaxationPic', 'https://i.pinimg.com/236x/ec/0b/f7/ec0bf7cb5d97653c77f3a6f02155decf.jpg', 'Peaceful moment of relaxation in nature', 20),
(41, 'Nature2', 'https://i.pinimg.com/236x/2b/60/92/2b60927681bb1678d3f61ce38d1be77c.jpg', 'Scenic view with waterfalls and greenery', 8),
(42, 'VacationPic2', 'https://i.pinimg.com/236x/f7/f0/57/f7f05778790bd2ecee391d48b22dbb6b.jpg', 'Exploring exotic locations during vacation', 14),
(43, 'Cityscape3', 'https://i.pinimg.com/236x/c7/4b/65/c74b65ca954e5918a75d0159fc7fe8fa.jpg', 'City lights and architecture at dusk', 3),
(44, 'FamilyPic2', 'https://i.pinimg.com/236x/29/72/94/297294817ae5bd70463dfa3f3dfcd22b.jpg', 'Cherished family gathering', 6),
(45, 'Adventure3', 'https://i.pinimg.com/236x/b9/80/d2/b980d2b691b2159e7b111b21d7ded3f4.jpg', 'Adventurous hike in the mountains', 11),
(46, 'Portrait2', 'https://i.pinimg.com/236x/85/a4/1e/85a41ed8348d20a06471a6a9273bb895.jpg', 'Elegant portrait with natural lighting', 19),
(47, 'Event4', 'https://i.pinimg.com/236x/c1/50/c5/c150c57e978180a5b3c2e551959764aa.jpg', 'Candid moments from a special event', 2),
(48, 'SunrisePic', 'https://i.pinimg.com/474x/b1/92/ac/b192ac5dacdaa0114219fd2d4fd1bb4e.jpg', 'Serene sunrise by the lakeside', 17),
(49, 'Travel5', 'https://i.pinimg.com/236x/d8/6e/42/d86e421495bdd9b3c40a5bb1d9712c98.jpg', 'Exploring diverse landscapes during travel', 5),
(50, 'PetPic3', 'https://i.pinimg.com/236x/22/eb/3f/22eb3ff1b243e59ac361bab2b92ea32e.jpg', 'Playful pet enjoying a day outdoors', 10),
(62, '', '1704463582796_meo.jpg', '2 cat sitting on w plants', 22),
(63, 'ArtD', 'https://i.pinimg.com/originals/51/d1/c9/51d1c959140fe04c4e3813422ac7a727.jpg', 'Simpson chill', 28),
(64, 'test hình giày', '1707104029169_Screenshot 2023-12-26 160848.png', 'test', 28),
(65, 'test ảnh mèo', '1707104216646_meo.jpg', 'mèo ', 28);

INSERT INTO `luu_anh` (`hinh_id`, `nguoi_dung_id`, `ngay_luu`) VALUES
(1, 28, '2023-01-15');
INSERT INTO `luu_anh` (`hinh_id`, `nguoi_dung_id`, `ngay_luu`) VALUES
(2, 2, '2023-02-20');
INSERT INTO `luu_anh` (`hinh_id`, `nguoi_dung_id`, `ngay_luu`) VALUES
(3, 3, '2023-03-25');
INSERT INTO `luu_anh` (`hinh_id`, `nguoi_dung_id`, `ngay_luu`) VALUES
(4, 4, '2023-04-10'),
(5, 5, '2023-05-05'),
(6, 6, '2023-06-12'),
(7, 7, '2023-07-18'),
(8, 8, '2023-08-22'),
(9, 9, '2023-09-30'),
(10, 10, '2023-10-08'),
(10, 22, '2023-12-14'),
(11, 11, '2023-11-14'),
(12, 12, '2023-12-19'),
(12, 22, '2023-12-26'),
(12, 24, '2024-02-20'),
(13, 13, '2024-01-02'),
(14, 14, '2024-02-08'),
(15, 15, '2024-03-14'),
(16, 16, '2024-04-20'),
(17, 17, '2024-05-26'),
(18, 18, '2024-06-30'),
(19, 19, '2024-07-04'),
(20, 20, '2024-08-10'),
(20, 22, '2023-12-14'),
(21, 8, '2023-01-15'),
(22, 14, '2023-02-20'),
(22, 24, '2024-02-20'),
(23, 3, '2023-03-25'),
(24, 6, '2023-04-10'),
(25, 11, '2023-05-05'),
(26, 19, '2023-06-12'),
(27, 2, '2023-07-18'),
(28, 17, '2023-08-22'),
(29, 5, '2023-09-30'),
(30, 10, '2023-10-08'),
(31, 12, '2023-11-14'),
(32, 7, '2023-12-19'),
(33, 16, '2024-01-02'),
(34, 1, '2024-02-08'),
(35, 9, '2024-03-14'),
(36, 13, '2024-04-20'),
(37, 18, '2024-05-26'),
(38, 4, '2024-06-30'),
(39, 15, '2024-07-04'),
(40, 20, '2024-08-10'),
(41, 8, '2023-01-15'),
(42, 14, '2023-02-20'),
(42, 24, '2024-02-20'),
(43, 3, '2023-03-25'),
(44, 6, '2023-04-10'),
(45, 11, '2023-05-05'),
(46, 19, '2023-06-12'),
(47, 2, '2023-07-18'),
(48, 17, '2023-08-22'),
(49, 5, '2023-09-30'),
(50, 10, '2023-10-08'),
(62, 22, '2024-01-05'),
(64, 28, '2024-02-05'),
(65, 28, '2024-02-05');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(1, 'john.doe@example.com', 'password123', 'John Doe', 25, 'https://i.pinimg.com/736x/c1/7d/fd/c17dfd78bd446e3da742212566411f95.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(2, 'jane.smith@example.com', 'securepass456', 'Jane Smith', 30, 'https://i.pinimg.com/564x/89/fb/94/89fb94cc90c8e3ac798959c246220a2b.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(3, 'alex.jones@example.com', 'strongpass789', 'Alex Jones', 22, 'https://i.pinimg.com/236x/43/59/9b/43599b0be7311dc61216f80cc2e929fa.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(4, 'emily.white@example.com', 'safe_password', 'Emily White', 28, 'https://i.pinimg.com/236x/d7/7c/75/d77c7561b7137e999499e6f1f3033859.jpg', NULL),
(5, 'michael.brown@example.com', 'myp@ssword', 'Michael Brown', 35, 'https://i.pinimg.com/236x/0d/24/0c/0d240ca5390c8509bdd38bff6893ed87.jpg', NULL),
(6, 'olivia.martin@example.com', 'access123', 'Olivia Martin', 27, 'https://i.pinimg.com/236x/d0/3f/28/d03f28b5b8bf837b31b2ddffa6f47c6d.jpg', NULL),
(7, 'david.wilson@example.com', 'secret_pass', 'David Wilson', 29, 'https://i.pinimg.com/236x/79/d3/d8/79d3d81d6a40208887b7e27cf49eb033.jpg', NULL),
(8, 'emma.taylor@example.com', 'hiddenpass', 'Emma Taylor', 26, 'https://i.pinimg.com/236x/7a/24/73/7a24738c5a761f679a98fbd66246019b.jpg', NULL),
(9, 'william.moore@example.com', 'passwd456', 'William Moore', 31, 'https://i.pinimg.com/236x/9e/3b/de/9e3bde1359c5528fb06e67c0d8c65ce4.jpg', NULL),
(10, 'sophia.anderson@example.com', 'protectedpass', 'Sophia Anderson', 24, 'https://i.pinimg.com/236x/94/b3/4e/94b34ee338cb3a625dda8ad6ca76acc6.jpg', NULL),
(11, 'jackson.hall@example.com', 'privatepass', 'Jackson Hall', 33, 'https://i.pinimg.com/236x/30/3a/2f/303a2f77010c847460e4c2d283c1a8ec.jpg', NULL),
(12, 'ella.miller@example.com', 'confidential', 'Ella Miller', 23, 'https://i.pinimg.com/236x/84/a6/1b/84a61b6797fa8efa95eaf62b2bfab80e.jpg', NULL),
(13, 'nathan.james@example.com', 'topsecret123', 'Nathan James', 32, 'https://i.pinimg.com/236x/0a/e8/89/0ae889a9fc207f19941c7cd62ea6cb2d.jpg', NULL),
(14, 'ava.baker@example.com', 'classified', 'Ava Baker', 28, 'https://i.pinimg.com/236x/9f/ac/78/9fac7808040e14ca7e20aa56ba0604f9.jpg', NULL),
(15, 'liam.cook@example.com', 'securedpass', 'Liam Cook', 26, 'https://i.pinimg.com/236x/9f/74/68/9f7468fa70b8d44aaa9b66c348fd0d8f.jpg', NULL),
(16, 'grace.rogers@example.com', 'unbreakablepass', 'Grace Rogers', 29, 'https://i.pinimg.com/236x/d6/1f/89/d61f89c4f69346a12c77f84c218d5303.jpg', NULL),
(17, 'owen.garcia@example.com', 'mypassword123', 'Owen Garcia', 30, 'https://i.pinimg.com/236x/d2/72/1b/d2721bb1cd36a99166c5c11532538abe.jpg', NULL),
(18, 'zoey.collins@example.com', 'strongsecure', 'Zoey Collins', 27, 'https://i.pinimg.com/236x/e2/12/92/e2129280999346015cee4826a72219c9.jpg', NULL),
(19, 'logan.allen@example.com', 'safepassword', 'Logan Allen', 25, 'https://i.pinimg.com/236x/97/41/5a/97415ad5948480a262aba83f64980a62.jpg', NULL),
(20, 'chloe.hill@example.com', 'mysecretword', 'Chloe Hill', 28, 'https://i.pinimg.com/236x/35/38/97/353897e5e1601a2d1c3dd750cd311db5.jpg', NULL),
(21, 'test123@gmail.com', '123', 'Tommy', 23, '', NULL),
(22, 'test1234@gmail.com', '$2b$10$HLj1cg7WtIXljkvArOwLyut8.qcsDaXdlUqfphIZAy45Rh3Rp7W7W', 'Duy', 18, '1708155392386_meo.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ3VvaV9kdW5nX2lkIjoyMiwia2V5IjoxNzA4MTU1NDU3NjgyLCJpYXQiOjE3MDgxNTU0NTcsImV4cCI6MTcwOTg4MzQ1N30.AtSvPqX1pxvQ4-jE8mqTDQCqNUGo4QcX4ap5BNlVHSY'),
(23, 'test1@gmail.com', '$2b$10$6xLLgiy4YGPCGVnFu1ItduluJMVk8jY1W9djsCilAfU3H1IL4O5Pa', 'Grace', 26, '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ3VvaV9kdW5nX2lkIjoyMywia2V5IjoxNzA4MTU3MTE4NzIwLCJpYXQiOjE3MDgxNTcxMTgsImV4cCI6MTcwOTg4NTExOH0.lGWKt7j9VlyloCMvf-nQDhQZKQrF5sh5jv6QLnwxl2s'),
(24, 'test2@gmail.com', '$2b$10$ARukOQ6as.RjIHmkezfcm.mFEEdg2KpVLiy75gYpN0N7ZyT3sxJ8C', 'Grace', 26, '1708330908533_05.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ3VvaV9kdW5nX2lkIjoyNCwia2V5IjoxNzA4NDE3OTI3NzE0LCJpYXQiOjE3MDg0MTc5MjcsImV4cCI6MTcxMDE0NTkyN30.xWyKgD5Cra-Cqv3ZYSiRr2EkMAKI4oq70_mWTITGWZQ'),
(25, 'test3@gmail.com', '$2b$10$vg6o6jRH5wzK9tami1pYseqzdEwv8vdiVXNFQzASpY0wDMiVOwDFu', NULL, NULL, '', NULL),
(27, '123@gmail.com', '$2b$10$Al5VzlDOlT268C1TOxqDku.orpeiKponWbitKJ.oS10Sh1qQXZHNa', '123', 123, '', NULL),
(28, 'duyTest@gmail.com', '$2b$10$tu.vf7a99NNRW2IOurAjtOFGDvH7BArRvpYpTblTF1Rufgh2Iai7q', 'DuyTester', 25, '1708147226187_logoD.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ3VvaV9kdW5nX2lkIjoyOCwia2V5IjoxNzA4MTQ0NjA3ODEzLCJpYXQiOjE3MDgxNDQ2MDcsImV4cCI6MTcwOTg3MjYwN30.s7IUWJ8yY7O8K488HDpGvpe63AnG16oUmidVD48b6Ow');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `phong_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`binh_luan_id`),
  KEY `phong_id` (`phong_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`phong_id`) REFERENCES `Phong` (`phong_id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `dat_phong_id` int NOT NULL AUTO_INCREMENT,
  `phong_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `ngay_den` datetime DEFAULT NULL,
  `ngay_di` datetime DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`dat_phong_id`),
  KEY `phong_id` (`phong_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`phong_id`) REFERENCES `Phong` (`phong_id`),
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `vai_tro_id` int DEFAULT '2',
  `ho_ten` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(50) DEFAULT NULL,
  `ngay_sinh` varchar(50) DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `gioi_tinh` varchar(20) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`nguoi_dung_id`),
  KEY `vai_tro_id` (`vai_tro_id`),
  CONSTRAINT `NguoiDung_ibfk_1` FOREIGN KEY (`vai_tro_id`) REFERENCES `VaiTro` (`vai_tro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Nhom` (
  `vai_tro_id` int NOT NULL,
  `quyen_id` int NOT NULL,
  PRIMARY KEY (`vai_tro_id`,`quyen_id`),
  KEY `quyen_id` (`quyen_id`),
  CONSTRAINT `Nhom_ibfk_1` FOREIGN KEY (`vai_tro_id`) REFERENCES `VaiTro` (`vai_tro_id`),
  CONSTRAINT `Nhom_ibfk_2` FOREIGN KEY (`quyen_id`) REFERENCES `Quyen` (`quyen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `phong_id` int NOT NULL AUTO_INCREMENT,
  `vi_tri_id` int DEFAULT NULL,
  `ten_phong` varchar(255) DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `hinh_anh` json DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`phong_id`),
  KEY `vi_tri_id` (`vi_tri_id`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`vi_tri_id`) REFERENCES `ViTri` (`vi_tri_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Quyen` (
  `quyen_id` int NOT NULL AUTO_INCREMENT,
  `quyen_tai_khoan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`quyen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `VaiTro` (
  `vai_tro_id` int NOT NULL AUTO_INCREMENT,
  `vai_tro_tai_khoan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`vai_tro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `vi_tri_id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(200) DEFAULT NULL,
  `tinh_thanh` varchar(150) DEFAULT NULL,
  `quoc_gia` varchar(150) DEFAULT NULL,
  `hinh_anh` json DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`vi_tri_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`binh_luan_id`, `phong_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(1, 1, 5, '2023-10-12 08:30:00', 'Phòng rất sạch sẽ và thoải mái.', 5, 0);
INSERT INTO `BinhLuan` (`binh_luan_id`, `phong_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(2, 2, 3, '2023-11-07 16:45:00', 'Giá phòng hợp lý và tiện nghi đầy đủ.', 4, 0);
INSERT INTO `BinhLuan` (`binh_luan_id`, `phong_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(3, 3, 8, '2023-12-22 10:15:00', 'Phòng rất đẹp và có view tuyệt vời.', 5, 0);
INSERT INTO `BinhLuan` (`binh_luan_id`, `phong_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(4, 4, 4, '2023-11-12 08:30:00', 'Phòng C1 rất sạch sẽ và thoải mái.', 4, 0),
(5, 5, 5, '2023-11-22 16:45:00', 'Phòng D1 có không gian rộng rãi.', 5, 0),
(6, 6, 6, '2023-12-07 10:15:00', 'Phòng E1 có giá hợp lý.', 4, 0),
(7, 7, 7, '2023-12-17 12:45:00', 'Phòng F1 có đầy đủ tiện nghi.', 5, 0),
(8, 8, 8, '2023-12-23 11:30:00', 'Phòng G1 có view tuyệt vời.', 5, 0),
(9, 19, 11, '2023-10-13 11:12:24', 'Phòng đẹp có hồ bơi !', 5, 0),
(10, 19, 11, '2023-10-13 09:54:57', 'Phòng đẹp', 5, 0);

INSERT INTO `DatPhong` (`dat_phong_id`, `phong_id`, `nguoi_dung_id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `isDelete`) VALUES
(1, 1, 5, '2023-10-10 14:00:00', '2023-10-15 12:00:00', 2, 0);
INSERT INTO `DatPhong` (`dat_phong_id`, `phong_id`, `nguoi_dung_id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `isDelete`) VALUES
(2, 2, 3, '2023-11-05 15:00:00', '2023-11-10 11:00:00', 1, 0);
INSERT INTO `DatPhong` (`dat_phong_id`, `phong_id`, `nguoi_dung_id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `isDelete`) VALUES
(3, 3, 8, '2023-12-20 13:00:00', '2023-12-25 10:00:00', 3, 0);
INSERT INTO `DatPhong` (`dat_phong_id`, `phong_id`, `nguoi_dung_id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `isDelete`) VALUES
(4, 4, 4, '2023-11-10 14:00:00', '2023-11-15 12:00:00', 2, 0),
(5, 5, 5, '2023-11-20 15:00:00', '2023-11-25 11:00:00', 1, 0),
(6, 6, 6, '2023-12-05 13:00:00', '2023-12-10 10:00:00', 3, 0),
(7, 7, 7, '2023-12-15 14:00:00', '2023-12-20 12:00:00', 2, 0),
(8, 8, 8, '2023-12-20 15:00:00', '2023-12-25 11:00:00', 1, 0),
(9, 11, 11, '2023-12-20 15:00:00', '2023-12-25 15:00:00', 9, 0),
(10, 11, 11, '2023-12-20 15:00:00', '2023-12-25 15:00:00', 5, 0);

INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `ngay_sinh`, `anh_dai_dien`, `gioi_tinh`, `tuoi`, `isDelete`) VALUES
(1, 1, 'Admin', 'admin@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '123456789', '1990-01-01', 'admin.jpg', 'Nam', 33, 0);
INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `ngay_sinh`, `anh_dai_dien`, `gioi_tinh`, `tuoi`, `isDelete`) VALUES
(2, 3, 'Anonymous', 'anonymous@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '456789123', '1980-03-25', 'anonymous.jpg', 'Nam', 43, 0);
INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `ngay_sinh`, `anh_dai_dien`, `gioi_tinh`, `tuoi`, `isDelete`) VALUES
(3, 2, 'User 1', 'user1@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '987654321', '1995-05-15', 'user1.jpg', 'Nữ', 28, 0);
INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `ngay_sinh`, `anh_dai_dien`, `gioi_tinh`, `tuoi`, `isDelete`) VALUES
(4, 2, 'User 2', 'user2@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '654321987', '1998-07-20', 'user2.jpg', 'Nam', 23, 0),
(5, 2, 'User 3', 'user3@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '789456123', '1992-12-05', 'user3.jpg', 'Nam', 31, 0),
(6, 2, 'User 4', 'user4@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '321654987', '1997-08-18', 'user4.jpg', 'Nữ', 26, 0),
(7, 2, 'User 5', 'user5@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '789456123', '1992-12-05', 'user5.jpg', 'Nam', 31, 0),
(8, 2, 'User 6', 'user6@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '456789456', '1987-11-30', 'user6.jpg', 'Nam', 35, 0),
(9, 2, 'User 7', 'user7@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '987654321', '1982-06-15', 'user7.jpg', 'Nữ', 41, 0),
(10, 2, 'Đức Tấn', 'ductan12345@gmail.com', '$2b$10$UJKYCd3FjLnH/9dYM6eN..aq/Ixnn3oCDKN/yCBkNpfjMbMqMk4cG', '0987654321', '1999-06-15', 'user8.jpg', 'nam', 25, 0),
(11, 2, 'Nguyễn Đức Tấn', 'ductan@gmail.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '0123456789', '1999-06-15', '1698143917838_gym.jpg', 'nam', 25, 0);

INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(1, 1);
INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(1, 2);
INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(1, 3);
INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(2, 3),
(1, 4),
(2, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(3, 12);

INSERT INTO `Phong` (`phong_id`, `vi_tri_id`, `ten_phong`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `isDelete`) VALUES
(1, 1, 'Phòng A1', 2, 2, 1, 'Phòng A1 mô tả', 100, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_1.jpg\"]', 0);
INSERT INTO `Phong` (`phong_id`, `vi_tri_id`, `ten_phong`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `isDelete`) VALUES
(2, 1, 'Phòng A2', 1, 1, 1, 'Phòng A2 mô tả', 80, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_2.jpg\"]', 0);
INSERT INTO `Phong` (`phong_id`, `vi_tri_id`, `ten_phong`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `isDelete`) VALUES
(3, 2, 'Phòng B1', 3, 3, 2, 'Phòng B1 mô tả', 150, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_3.jpg\"]', 0);
INSERT INTO `Phong` (`phong_id`, `vi_tri_id`, `ten_phong`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `isDelete`) VALUES
(4, 3, 'Phòng C1', 2, 2, 1, 'Phòng C1 mô tả', 120, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_4.jpg\"]', 0),
(5, 4, 'Phòng D1', 1, 1, 1, 'Phòng D1 mô tả', 90, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_5.jpg\"]', 0),
(6, 5, 'Phòng E1', 3, 3, 2, 'Phòng E1 mô tả', 160, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_6.jpg\"]', 0),
(7, 6, 'Phòng F1', 2, 2, 1, 'Phòng F1 mô tả', 110, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_7.jpg\"]', 0),
(8, 7, 'Phòng G1', 1, 1, 1, 'Phòng G1 mô tả', 80, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_8.jpg\"]', 0),
(9, 8, 'Phòng H1', 3, 3, 2, 'Phòng H1 mô tả', 170, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_9.jpg\"]', 0),
(10, 9, 'Phòng I1', 2, 2, 1, 'Phòng I1 mô tả', 130, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_10.jpg\"]', 0),
(11, 10, 'Phòng J1', 2, 2, 1, 'Phòng J1 mô tả', 120, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_11.jpg\"]', 0),
(12, 11, 'Phòng K1', 1, 1, 1, 'Phòng K1 mô tả', 90, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_12.jpg\"]', 0),
(13, 12, 'Phòng L1', 3, 3, 2, 'Phòng L1 mô tả', 160, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_13.jpg\"]', 0),
(14, 13, 'Phòng M1', 2, 2, 1, 'Phòng M1 mô tả', 110, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_14.jpg\"]', 0),
(15, 14, 'Phòng N1', 1, 1, 1, 'Phòng N1 mô tả', 80, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_15.jpg\"]', 0),
(16, 15, 'Phòng O1', 2, 2, 1, 'Phòng O1 mô tả', 130, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_16.jpg\"]', 0),
(17, 16, 'Phòng P1', 1, 1, 1, 'Phòng P1 mô tả', 95, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_17.jpg\"]', 0),
(18, 17, 'Phòng Q1', 3, 3, 2, 'Phòng Q1 mô tả', 170, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_18.jpg\"]', 0),
(19, 18, 'Phòng R1', 2, 2, 1, 'Phòng R1 mô tả', 115, 1, 1, 1, 1, 1, 1, 1, 1, 0, '[\"anh_phong_19.jpg\"]', 0),
(20, 19, 'Phòng S1', 1, 1, 1, 'Phòng S1 mô tả', 85, 1, 0, 1, 1, 1, 0, 0, 0, 1, '[\"anh_phong_20.jpg\"]', 1),
(21, 2, 'Phòng view landmark 81', 2, 2, 2, 'Phòng có đầy đủ tất cả các tiện nghi !!!', 90, 1, 1, 1, 1, 1, 1, 1, 1, 1, '[\"1697523536392_1.jpg\", \"1697523536396_2.jpg\"]', 0),
(22, 2, 'Phòng View biển', 3, 3, 3, 'Phòng có đầy đủ tất cả các tiện nghi !!!', 90, 1, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 0),
(23, 2, 'Phòng view landmark 81 sang chảnh', 3, 2, 2, 'Phòng có đầy đủ tất cả các tiện nghi !!!', 90, 1, 1, 1, 1, 1, 1, 1, 1, 1, '[\"1698148856792_gym.jpg\", \"1698148856792_7979.png\", \"1698148856796_16868.png\"]', 0);

INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(1, 'Thêm user');
INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(2, 'Xóa user');
INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(3, 'Sửa thông tin user');
INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(4, 'Xem thông tin user'),
(5, 'Lấy danh sách thông tin tất cả user'),
(6, 'Thêm phòng'),
(7, 'Sửa thông tin phòng'),
(8, 'Xóa phòng'),
(9, 'Đặt phòng'),
(10, 'Hủy đặt phòng'),
(11, 'Bình luận phòng'),
(12, 'Xem danh sách phòng');

INSERT INTO `VaiTro` (`vai_tro_id`, `vai_tro_tai_khoan`) VALUES
(1, 'admin');
INSERT INTO `VaiTro` (`vai_tro_id`, `vai_tro_tai_khoan`) VALUES
(2, 'user');
INSERT INTO `VaiTro` (`vai_tro_id`, `vai_tro_tai_khoan`) VALUES
(3, 'anonymous');

INSERT INTO `ViTri` (`vi_tri_id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `isDelete`) VALUES
(1, 'Hà Nội', 'Hà Nội', 'Việt Nam', '[\"hanoi.jpg\"]', 0);
INSERT INTO `ViTri` (`vi_tri_id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `isDelete`) VALUES
(2, 'Hồ Chí Minh', 'Hồ Chí Minh', 'Việt Nam', '[\"hochiminh.jpg\"]', 0);
INSERT INTO `ViTri` (`vi_tri_id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `isDelete`) VALUES
(3, 'Đà Nẵng', 'Đà Nẵng', 'Việt Nam', '[\"danang.jpg\"]', 0);
INSERT INTO `ViTri` (`vi_tri_id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `isDelete`) VALUES
(4, 'Cần Thơ', 'Cần Thơ', 'Việt Nam', '[\"cantho.jpg\"]', 0),
(5, 'Hải Phòng', 'Hải Phòng', 'Việt Nam', '[\"haiphong.jpg\"]', 0),
(6, 'Quy Nhơn', 'Bình Định', 'Việt Nam', '[\"quynhon.jpg\"]', 0),
(7, 'Huế', 'Thừa Thiên-Huế', 'Việt Nam', '[\"hue.jpg\"]', 0),
(8, 'Nha Trang', 'Khánh Hòa', 'Việt Nam', '[\"nhatrang.jpg\"]', 0),
(9, 'Vũng Tàu', 'Bà Rịa-Vũng Tàu', 'Việt Nam', '[\"vungtau.jpg\"]', 0),
(10, 'Đắk Lắk', 'Buôn Ma Thuột', 'Việt Nam', '[\"daklak.jpg\"]', 0),
(11, 'Phan Thiết', 'Bình Thuận', 'Việt Nam', '[\"phanthiet.jpg\"]', 0),
(12, 'Cà Mau', 'Cà Mau', 'Việt Nam', '[\"camau.jpg\"]', 0),
(13, 'Hạ Long', 'Quảng Ninh', 'Việt Nam', '[\"halong.jpg\"]', 0),
(14, 'Hà Giang', 'Hà Giang', 'Việt Nam', '[\"hagiang.jpg\"]', 0),
(15, 'Sapa', 'Lào Cai', 'Việt Nam', '[\"sapa.jpg\"]', 0),
(16, 'Phú Quốc', 'Kiên Giang', 'Việt Nam', '[\"phuquoc.jpg\"]', 0),
(17, 'Đà Lạt', 'Lâm Đồng', 'Việt Nam', '[\"dalat.jpg\"]', 0),
(18, 'Vinh', 'Nghệ An', 'Việt Nam', '[\"vinh.jpg\"]', 0),
(19, 'Cà Mau', 'Cà Mau', 'Việt Nam', '[\"1697525122201_1.jpg\", \"1697525122206_2.jpg\", \"1697525122211_3.jpg\"]', 0),
(20, 'Hồ Chí Minh 1', 'Quận Tân Bình 1', 'Việt Nam 1', '[\"1698149220323_7979.png\", \"1698149220326_16868.png\", \"1698149220329_cotienmuamacbook.jpg\"]', 0),
(21, 'Hồ Chí Minh', 'Quận Tân Phú', 'Việt Nam', NULL, 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
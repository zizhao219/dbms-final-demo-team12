-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 12, 2016 at 07:52 朝
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pilot`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(20) CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `member_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `Case`
--

CREATE TABLE `Case` (
  `CID` int(3) NOT NULL,
  `CName` varchar(20) NOT NULL,
  `Date_1` varchar(10) NOT NULL,
  `Time` varchar(10) NOT NULL,
  `Week` varchar(1) NOT NULL,
  `HR` int(3) NOT NULL,
  `Description` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Case`
--

INSERT INTO `Case` (`CID`, `CName`, `Date_1`, `Time`, `Week`, `HR`, `Description`) VALUES
(2, '聖利諾修學校', '6/27 (一)', '13-15', '一', 3, '高中團'),
(3, '財管系接待澳門大學', '6/29（三）', '10-11', '三', 1, '正式團'),
(4, '香港保良局百週年李兆忠紀念中學', '6/30 (四)', '10-12', '四', 2, '高中團（香港）'),
(5, '超政新生營', '9/8（四）', '13-16', '四', 3, '多組上台和簡報'),
(11, '122', '1', '1', '一', 1, '1'),
(12, '112', '11', '1', '一', 1, '2223'),
(14, '加拿大渥太華夏日課程', '7/1（五）', '9-11', '五', 2, '需要英文導覽'),
(15, '畢業五十年校友返校', '7/5（二）', '14-16', '二', 2, '校友年齡較大，資訊不宜過多');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `account` varchar(30) CHARACTER SET utf8 NOT NULL,
  `password` varchar(25) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `account`, `password`) VALUES
(1, '1', '1', '1'),
(2, '2', '2', '2'),
(3, '3', '3', '3'),
(4, '4', '4', '4'),
(5, '5', '5', '5'),
(6, '6', '6', '6'),
(7, '7', '7', '7'),
(8, '8', '8', '8'),
(33, 'op', '2o', '2o');

-- --------------------------------------------------------

--
-- Table structure for table `MemberStatus`
--

CREATE TABLE `MemberStatus` (
  `SID` int(9) NOT NULL,
  `Name` varchar(10) NOT NULL,
  `Department` varchar(10) NOT NULL,
  `Grade` varchar(1) NOT NULL,
  `Sex` varchar(1) NOT NULL,
  `Phone` varchar(10) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `myhr` int(3) NOT NULL,
  `ID` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MemberStatus`
--

INSERT INTO `MemberStatus` (`SID`, `Name`, `Department`, `Grade`, `Sex`, `Phone`, `Email`, `myhr`, `ID`) VALUES
(1004, '123', 'ss', '一', '男', 'sss', 'sss', 0, 33),
(101203456, '11', '地政學系', '一', '女', '11', '11', 3, 1),
(101303005, 'N', '會計學系', '3', '女', '132', 'FG', 36, 2),
(101303073, '蘇瑋婷', '會計學系', '四', '女', '963456123', '101303073@nccu.edu.tw', 20, 3),
(102334567, '徐榕逸', '法律學系', '三', '男', '967563442', '102334567@nccu.edu.tw', 10, 4),
(102453002, '歐千華', '外交學系', '三', '女', '912334567', '102453002@nccu.edu.tw', 20, 5),
(103405093, '許佑', '法律學系', '二', '男', '923567832', '103405093@nccu.edu.tw', 10, 6),
(103406778, '黃千育', '教育學系', '二', '女', '987665443', '103406778@nccu.edu.tw', 30, 7),
(103445002, '王育柔', '新聞學系', '二', '女', '956788914', '103445002@nccu.edu.tw', 10, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Member_ClassSchedule1`
--

CREATE TABLE `Member_ClassSchedule1` (
  `SID` int(9) NOT NULL,
  `Mon_9_12` tinyint(1) NOT NULL,
  `Mon_13_17` tinyint(1) NOT NULL,
  `Tue_9_12` tinyint(1) NOT NULL,
  `Tue_13_17` tinyint(1) NOT NULL,
  `Wed_9_12` tinyint(1) NOT NULL,
  `Wed_13_17` tinyint(1) NOT NULL,
  `Thu_9_12` tinyint(1) NOT NULL,
  `Thu_13_17` tinyint(1) NOT NULL,
  `Fri_9_12` tinyint(1) NOT NULL,
  `Fri_13_17` tinyint(1) NOT NULL,
  `ID1` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Member_ClassSchedule1`
--

INSERT INTO `Member_ClassSchedule1` (`SID`, `Mon_9_12`, `Mon_13_17`, `Tue_9_12`, `Tue_13_17`, `Wed_9_12`, `Wed_13_17`, `Thu_9_12`, `Thu_13_17`, `Fri_9_12`, `Fri_13_17`, `ID1`) VALUES
(1004, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 33),
(101203456, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1),
(101303005, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 2),
(101303073, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 3),
(102334567, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 4),
(102453002, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 5),
(103405093, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 6),
(103406778, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 7),
(103445002, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Qualify`
--

CREATE TABLE `Qualify` (
  `CID` int(3) NOT NULL,
  `SID` int(9) NOT NULL,
  `statu` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `Qualify`
--

INSERT INTO `Qualify` (`CID`, `SID`, `statu`) VALUES
(2, 101303005, 1),
(2, 101303073, 1),
(3, 101303005, 1),
(4, 101303005, 1),
(5, 101303005, 1),
(11, 101303005, 0),
(12, 101303005, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `Case`
--
ALTER TABLE `Case`
  ADD PRIMARY KEY (`CID`),
  ADD UNIQUE KEY `CID` (`CID`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MemberStatus`
--
ALTER TABLE `MemberStatus`
  ADD PRIMARY KEY (`SID`,`Name`),
  ADD KEY `ID` (`ID`);

--
-- Indexes for table `Member_ClassSchedule1`
--
ALTER TABLE `Member_ClassSchedule1`
  ADD UNIQUE KEY `SID_2` (`SID`),
  ADD KEY `SID` (`SID`),
  ADD KEY `ID1` (`ID1`);

--
-- Indexes for table `Qualify`
--
ALTER TABLE `Qualify`
  ADD PRIMARY KEY (`CID`,`SID`),
  ADD KEY `CID` (`CID`),
  ADD KEY `SID` (`SID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Case`
--
ALTER TABLE `Case`
  MODIFY `CID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `MemberStatus`
--
ALTER TABLE `MemberStatus`
  MODIFY `ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `Member_ClassSchedule1`
--
ALTER TABLE `Member_ClassSchedule1`
  MODIFY `ID1` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);

--
-- Constraints for table `Member_ClassSchedule1`
--
ALTER TABLE `Member_ClassSchedule1`
  ADD CONSTRAINT `Member_ClassSchedule1_ibfk_1` FOREIGN KEY (`ID1`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `Member_ClassSchedule1_ibfk_2` FOREIGN KEY (`SID`) REFERENCES `MemberStatus` (`SID`);

--
-- Constraints for table `Qualify`
--
ALTER TABLE `Qualify`
  ADD CONSTRAINT `Qualify_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `Case` (`CID`),
  ADD CONSTRAINT `Qualify_ibfk_2` FOREIGN KEY (`SID`) REFERENCES `MemberStatus` (`SID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

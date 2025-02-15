-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2025 a las 20:29:58
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_foro`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `foro_Borrar` (IN `_id` INT)   delete from foros where for_id=_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `foro_Insertar` (IN `_tema` VARCHAR(50))   Insert into foros values (null, _tema)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `foto_Actualizar` (IN `_id` INT, IN `_foto` VARCHAR(50))   UPDATE usuarios SET
usuarios.usu_foto = _foto
WHERE usuarios.usu_id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensaje_Borrar` (IN `_id` INT)   delete from foros_usuarios where fu_id=_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensaje_Insertar` (IN `_usuario` INT, IN `_foro` INT, IN `_mensaje` MEDIUMTEXT)   Insert into foros_usuarios values (null, _usuario, _foro, _mensaje , now())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensaje_mostrar` (IN `_foro` INT)   Select foros_usuarios.fu_mensaje from foros_usuarios where foros_usuarios.fu_for_id=_foro$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensaje_usuario_mostrar` (IN `_usuario` INT)   Select foros_usuarios.fu_mensaje from foros_usuarios where foros_usuarios.fu_usu_id=_usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarios_Insertar` (IN `_nombre` VARCHAR(50), IN `_alias` VARCHAR(50), IN `_password` VARCHAR(50))   Insert into usuarios values (null,_nombre  , _alias, md5(_password),0, 'anonimo.png' )$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_Login` (IN `_usu` VARCHAR(50), IN `_pass` VARCHAR(50))   select * 
FROM usuarios
WHERE 
usuarios.usu_alias = _usu   AND
usuarios.usu_password = md5(_pass)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

CREATE TABLE `foros` (
  `for_id` int(10) UNSIGNED NOT NULL,
  `for_tema` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foros`
--

INSERT INTO `foros` (`for_id`, `for_tema`) VALUES
(61, 'Estrenos'),
(62, 'Clásicos'),
(63, 'Comedia'),
(64, 'Acción'),
(67, 'Aventura'),
(68, 'Musicales'),
(69, 'Suspenso'),
(70, 'Actores'),
(71, 'Directores'),
(72, 'Infantiles'),
(73, 'Terror'),
(78, 'Drama'),
(79, 'Premiadas'),
(80, 'Ficción'),
(81, 'Europeas'),
(82, 'Españolas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros_usuarios`
--

CREATE TABLE `foros_usuarios` (
  `fu_id` int(10) UNSIGNED NOT NULL,
  `fu_usu_id` int(10) UNSIGNED NOT NULL,
  `fu_for_id` int(10) UNSIGNED NOT NULL,
  `fu_mensaje` mediumtext DEFAULT NULL,
  `fu_fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foros_usuarios`
--

INSERT INTO `foros_usuarios` (`fu_id`, `fu_usu_id`, `fu_for_id`, `fu_mensaje`, `fu_fecha`) VALUES
(70, 2, 64, 'Mensaje de Prueba', '2025-02-15 18:56:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(10) UNSIGNED NOT NULL,
  `usu_nombre` varchar(50) DEFAULT NULL,
  `usu_alias` varchar(50) DEFAULT NULL,
  `usu_password` varchar(50) DEFAULT NULL,
  `usu_permiso` tinyint(4) DEFAULT NULL,
  `usu_foto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_nombre`, `usu_alias`, `usu_password`, `usu_permiso`, `usu_foto`) VALUES
(1, 'Administrador', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, 'admin.jpg'),
(2, 'Miguel de Nóbrega', 'miguel', '9eb0c9605dc81a68731f61b3e0838937', 0, 'u15.gif'),
(3, 'Pepe', 'pepe', '926e27eecdbc7a18858b3798ba99bddd', 0, 'pepe.jpg'),
(15, 'Cristiano', 'Cr7', 'dd335f498ed05ba3881a0fbbaf777697', 0, 'cr7.png'),
(18, 'abcd', 'abc', '900150983cd24fb0d6963f7d28e17f72', 0, 'jpg'),
(22, 'Carlos', 'carlos', '94f3b3a16d8ce064c808b16bee5003c5', 0, 'jpg'),
(24, 'Invitado', 'invitado', 'a6ae8a143d440ab8c006d799f682d48d', 0, 'jpg'),
(25, 'PruebaF1', 'PruebaF2', 'ae334c93bdbf4683fa6903c0f0ccf8fa', 0, 'jpg'),
(26, 'Nadie', 'Nadie', '9a8924d7a526f3648e69e76713235673', 0, 'Foto de Prueba'),
(27, 'persona1', 'persona1', '202cb962ac59075b964b07152d234b70', 0, 'jpg'),
(28, 'PruebaFoto', 'Foto', '66c9eed121277d8be2df09ce25c4687a', 0, 'anonimo.png'),
(29, 'PruebaFoto2', 'Foto2', 'b5ad59e2ab12a2f3b566c82112c068aa', 0, 'anonimo.png'),
(30, 'Test1', 'test1', '5a105e8b9d40e1329780d62ea2265d8a', 0, 'u10.gif');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `foros`
--
ALTER TABLE `foros`
  ADD PRIMARY KEY (`for_id`);

--
-- Indices de la tabla `foros_usuarios`
--
ALTER TABLE `foros_usuarios`
  ADD PRIMARY KEY (`fu_id`,`fu_usu_id`,`fu_for_id`),
  ADD KEY `fu_usu_id` (`fu_usu_id`),
  ADD KEY `fu_for_id` (`fu_for_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `foros`
--
ALTER TABLE `foros`
  MODIFY `for_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `foros_usuarios`
--
ALTER TABLE `foros_usuarios`
  MODIFY `fu_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `foros_usuarios`
--
ALTER TABLE `foros_usuarios`
  ADD CONSTRAINT `foros_usuarios_ibfk_1` FOREIGN KEY (`fu_usu_id`) REFERENCES `usuarios` (`usu_id`),
  ADD CONSTRAINT `foros_usuarios_ibfk_2` FOREIGN KEY (`fu_for_id`) REFERENCES `foros` (`for_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

USE [master]
GO
/****** Object:  Database [DIAGRAMA]    Script Date: 20/11/2023 03:33:04 p. m. ******/
CREATE DATABASE [DIAGRAMA]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'diagrama}', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\diagrama}.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'diagrama}_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\diagrama}_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DIAGRAMA] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DIAGRAMA].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DIAGRAMA] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DIAGRAMA] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DIAGRAMA] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DIAGRAMA] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DIAGRAMA] SET ARITHABORT OFF 
GO
ALTER DATABASE [DIAGRAMA] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DIAGRAMA] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DIAGRAMA] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DIAGRAMA] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DIAGRAMA] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DIAGRAMA] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DIAGRAMA] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DIAGRAMA] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DIAGRAMA] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DIAGRAMA] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DIAGRAMA] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DIAGRAMA] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DIAGRAMA] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DIAGRAMA] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DIAGRAMA] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DIAGRAMA] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DIAGRAMA] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DIAGRAMA] SET RECOVERY FULL 
GO
ALTER DATABASE [DIAGRAMA] SET  MULTI_USER 
GO
ALTER DATABASE [DIAGRAMA] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DIAGRAMA] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DIAGRAMA] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DIAGRAMA] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DIAGRAMA] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DIAGRAMA] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DIAGRAMA', N'ON'
GO
ALTER DATABASE [DIAGRAMA] SET QUERY_STORE = ON
GO
ALTER DATABASE [DIAGRAMA] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DIAGRAMA]
GO
/****** Object:  Table [dbo].[Actor]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actor](
	[ID_Actor] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](200) NOT NULL,
	[Fecha_Nacimiento] [date] NOT NULL,
	[Pais_Nacimiento] [int] NOT NULL,
	[Biografia] [text] NOT NULL,
	[Foto_Actor] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Actor] PRIMARY KEY CLUSTERED 
(
	[ID_Actor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Actor_Pelicula]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actor_Pelicula](
	[ID_Actor] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
	[Personaje] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Actor_Pelicula] PRIMARY KEY CLUSTERED 
(
	[ID_Actor] ASC,
	[ID_Pelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Aviso]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Aviso](
	[ID_Aviso] [int] IDENTITY(1,1) NOT NULL,
	[Mensaje] [nvarchar](250) NOT NULL,
	[ID_Usuario_Receptor] [int] NOT NULL,
	[ID_Moderador] [int] NOT NULL,
	[Estatus] [bit] NOT NULL,
 CONSTRAINT [PK_Mandar__Aviso] PRIMARY KEY CLUSTERED 
(
	[ID_Aviso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clasificacion]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clasificacion](
	[ID_Clasificacion] [int] IDENTITY(1,1) NOT NULL,
	[Clasificacion] [nvarchar](50) NOT NULL,
	[Descripcion] [text] NOT NULL,
	[Imagen_Clasif] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Clasificacion] PRIMARY KEY CLUSTERED 
(
	[ID_Clasificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clasificacion_Pelicula]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clasificacion_Pelicula](
	[ID_Clasificacion] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
 CONSTRAINT [PK_Clasificacion_Pelicula] PRIMARY KEY CLUSTERED 
(
	[ID_Clasificacion] ASC,
	[ID_Pelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Director]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Director](
	[ID_Director] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](200) NOT NULL,
	[Fecha_Nacimiento] [date] NOT NULL,
	[Pais_Nacimiento] [int] NOT NULL,
	[Biografia] [text] NOT NULL,
	[Foto_Director] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Director] PRIMARY KEY CLUSTERED 
(
	[ID_Director] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Director_Pelicula]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Director_Pelicula](
	[ID_Director] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
 CONSTRAINT [PK_Director_Pelicula] PRIMARY KEY CLUSTERED 
(
	[ID_Director] ASC,
	[ID_Pelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Error]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Error](
	[ID_Error] [int] IDENTITY(1,1) NOT NULL,
	[Mensaje] [nvarchar](250) NOT NULL,
	[ID_Experto] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
	[Estatus] [bit] NOT NULL,
 CONSTRAINT [PK_Mandar_Error_Aadmin] PRIMARY KEY CLUSTERED 
(
	[ID_Error] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favorito]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favorito](
	[ID_Usuario] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
	[Fecha_Favorito] [datetime] NOT NULL,
 CONSTRAINT [PK_Dar_Favorito_1] PRIMARY KEY CLUSTERED 
(
	[ID_Usuario] ASC,
	[ID_Pelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genero]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genero](
	[ID_Genero] [int] IDENTITY(1,1) NOT NULL,
	[Genero] [nvarchar](50) NOT NULL,
	[Descripcion] [text] NOT NULL,
	[Imagen_Genero] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Genero] PRIMARY KEY CLUSTERED 
(
	[ID_Genero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Like]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Like](
	[FechaLike] [datetime] NOT NULL,
	[ID_Usuario] [int] NOT NULL,
	[ID_Reseña] [int] NOT NULL,
 CONSTRAINT [PK_Like] PRIMARY KEY CLUSTERED 
(
	[ID_Usuario] ASC,
	[ID_Reseña] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pais_Origen]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pais_Origen](
	[ID_Pais] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](20) NOT NULL,
	[Pais_Imagen] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Pais_Origen] PRIMARY KEY CLUSTERED 
(
	[ID_Pais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pelicula]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula](
	[ID_Pelicula] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](200) NOT NULL,
	[Sinopsis] [text] NOT NULL,
	[Fecha_Lanzamiento] [date] NOT NULL,
	[Duracion] [decimal](5, 2) NOT NULL,
	[Presupuesto] [int] NULL,
	[imagen] [nvarchar](max) NOT NULL,
	[Recaudacion] [int] NULL,
	[ID_Pais_Origen] [int] NOT NULL,
 CONSTRAINT [PK_Pelicula] PRIMARY KEY CLUSTERED 
(
	[ID_Pelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pelicula_Genero]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula_Genero](
	[ID_Pelicula] [int] NOT NULL,
	[ID_Genero] [int] NOT NULL,
 CONSTRAINT [PK_Pelicula_Genero] PRIMARY KEY CLUSTERED 
(
	[ID_Pelicula] ASC,
	[ID_Genero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reseña]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reseña](
	[ID_Reseña] [int] IDENTITY(1,1) NOT NULL,
	[Contenido] [text] NOT NULL,
	[Fecha_Publicacion] [date] NOT NULL,
	[Calificacion] [float] NOT NULL,
	[ID_Usuario] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
 CONSTRAINT [PK_Reseña] PRIMARY KEY CLUSTERED 
(
	[ID_Reseña] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[ID_Rol] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED 
(
	[ID_Rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[ID_Usuario] [int] IDENTITY(1,1) NOT NULL,
	[Nickname] [nvarchar](50) NOT NULL,
	[ID_Rol] [int] NOT NULL,
	[Correo_Electronico] [nvarchar](200) NOT NULL,
	[Contraseña] [nvarchar](50) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Apellido] [nvarchar](100) NOT NULL,
	[Foto_Perfil] [nvarchar](max) NULL,
	[Fecha_Registro] [date] NOT NULL,
	[Fecha_Nacimiento] [date] NOT NULL,
	[Sexo] [nvarchar](50) NOT NULL,
	[Telefono] [nvarchar](50) NOT NULL,
	[Descripcion] [text] NULL,
 CONSTRAINT [PK_Usuario_1] PRIMARY KEY CLUSTERED 
(
	[ID_Usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Visto]    Script Date: 20/11/2023 03:33:04 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Visto](
	[ID_Usuario] [int] NOT NULL,
	[ID_Pelicula] [int] NOT NULL,
	[Fecha_Vista] [datetime] NOT NULL,
 CONSTRAINT [PK_Pelicula_Vista_1] PRIMARY KEY CLUSTERED 
(
	[ID_Usuario] ASC,
	[ID_Pelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Actor]  WITH CHECK ADD  CONSTRAINT [FK_Actor_Pais_Origen] FOREIGN KEY([Pais_Nacimiento])
REFERENCES [dbo].[Pais_Origen] ([ID_Pais])
GO
ALTER TABLE [dbo].[Actor] CHECK CONSTRAINT [FK_Actor_Pais_Origen]
GO
ALTER TABLE [dbo].[Actor_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Actor_Pelicula_Actor] FOREIGN KEY([ID_Actor])
REFERENCES [dbo].[Actor] ([ID_Actor])
GO
ALTER TABLE [dbo].[Actor_Pelicula] CHECK CONSTRAINT [FK_Actor_Pelicula_Actor]
GO
ALTER TABLE [dbo].[Actor_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Actor_Pelicula_Pelicula1] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Actor_Pelicula] CHECK CONSTRAINT [FK_Actor_Pelicula_Pelicula1]
GO
ALTER TABLE [dbo].[Aviso]  WITH CHECK ADD  CONSTRAINT [FK_Aviso_Usuario] FOREIGN KEY([ID_Moderador])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Aviso] CHECK CONSTRAINT [FK_Aviso_Usuario]
GO
ALTER TABLE [dbo].[Aviso]  WITH CHECK ADD  CONSTRAINT [FK_Mandar__Aviso_Usuario1] FOREIGN KEY([ID_Usuario_Receptor])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Aviso] CHECK CONSTRAINT [FK_Mandar__Aviso_Usuario1]
GO
ALTER TABLE [dbo].[Clasificacion_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Clasificacion_Pelicula_Clasificacion] FOREIGN KEY([ID_Clasificacion])
REFERENCES [dbo].[Clasificacion] ([ID_Clasificacion])
GO
ALTER TABLE [dbo].[Clasificacion_Pelicula] CHECK CONSTRAINT [FK_Clasificacion_Pelicula_Clasificacion]
GO
ALTER TABLE [dbo].[Clasificacion_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Clasificacion_Pelicula_Pelicula1] FOREIGN KEY([ID_Clasificacion])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Clasificacion_Pelicula] CHECK CONSTRAINT [FK_Clasificacion_Pelicula_Pelicula1]
GO
ALTER TABLE [dbo].[Director]  WITH CHECK ADD  CONSTRAINT [FK_Director_Pais_Origen] FOREIGN KEY([Pais_Nacimiento])
REFERENCES [dbo].[Pais_Origen] ([ID_Pais])
GO
ALTER TABLE [dbo].[Director] CHECK CONSTRAINT [FK_Director_Pais_Origen]
GO
ALTER TABLE [dbo].[Director_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Director_Pelicula_Director] FOREIGN KEY([ID_Director])
REFERENCES [dbo].[Director] ([ID_Director])
GO
ALTER TABLE [dbo].[Director_Pelicula] CHECK CONSTRAINT [FK_Director_Pelicula_Director]
GO
ALTER TABLE [dbo].[Director_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Director_Pelicula_Pelicula] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Director_Pelicula] CHECK CONSTRAINT [FK_Director_Pelicula_Pelicula]
GO
ALTER TABLE [dbo].[Error]  WITH CHECK ADD  CONSTRAINT [FK_Error_En_Datos_Pelicula] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Error] CHECK CONSTRAINT [FK_Error_En_Datos_Pelicula]
GO
ALTER TABLE [dbo].[Error]  WITH CHECK ADD  CONSTRAINT [FK_Error_Usuario] FOREIGN KEY([ID_Experto])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Error] CHECK CONSTRAINT [FK_Error_Usuario]
GO
ALTER TABLE [dbo].[Favorito]  WITH CHECK ADD  CONSTRAINT [FK_Dar_Favorito_Pelicula] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Favorito] CHECK CONSTRAINT [FK_Dar_Favorito_Pelicula]
GO
ALTER TABLE [dbo].[Favorito]  WITH CHECK ADD  CONSTRAINT [FK_Dar_Favorito_Usuario1] FOREIGN KEY([ID_Usuario])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Favorito] CHECK CONSTRAINT [FK_Dar_Favorito_Usuario1]
GO
ALTER TABLE [dbo].[Like]  WITH CHECK ADD  CONSTRAINT [FK_Dar_Like o Hacer_Comentario_Reseña] FOREIGN KEY([ID_Reseña])
REFERENCES [dbo].[Reseña] ([ID_Reseña])
GO
ALTER TABLE [dbo].[Like] CHECK CONSTRAINT [FK_Dar_Like o Hacer_Comentario_Reseña]
GO
ALTER TABLE [dbo].[Like]  WITH CHECK ADD  CONSTRAINT [FK_Dar_Like_Usuario1] FOREIGN KEY([ID_Usuario])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Like] CHECK CONSTRAINT [FK_Dar_Like_Usuario1]
GO
ALTER TABLE [dbo].[Pelicula]  WITH CHECK ADD  CONSTRAINT [FK_Pelicula_Pais_Origen] FOREIGN KEY([ID_Pais_Origen])
REFERENCES [dbo].[Pais_Origen] ([ID_Pais])
GO
ALTER TABLE [dbo].[Pelicula] CHECK CONSTRAINT [FK_Pelicula_Pais_Origen]
GO
ALTER TABLE [dbo].[Pelicula_Genero]  WITH CHECK ADD  CONSTRAINT [FK_Pelicula_Genero_Genero] FOREIGN KEY([ID_Genero])
REFERENCES [dbo].[Genero] ([ID_Genero])
GO
ALTER TABLE [dbo].[Pelicula_Genero] CHECK CONSTRAINT [FK_Pelicula_Genero_Genero]
GO
ALTER TABLE [dbo].[Pelicula_Genero]  WITH CHECK ADD  CONSTRAINT [FK_Pelicula_Genero_Pelicula1] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Pelicula_Genero] CHECK CONSTRAINT [FK_Pelicula_Genero_Pelicula1]
GO
ALTER TABLE [dbo].[Reseña]  WITH CHECK ADD  CONSTRAINT [FK_Reseña_Pelicula] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Reseña] CHECK CONSTRAINT [FK_Reseña_Pelicula]
GO
ALTER TABLE [dbo].[Reseña]  WITH CHECK ADD  CONSTRAINT [FK_Reseña_Usuario1] FOREIGN KEY([ID_Usuario])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Reseña] CHECK CONSTRAINT [FK_Reseña_Usuario1]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Rol] FOREIGN KEY([ID_Rol])
REFERENCES [dbo].[Rol] ([ID_Rol])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Rol]
GO
ALTER TABLE [dbo].[Visto]  WITH CHECK ADD  CONSTRAINT [FK_Pelicula_Vista_Pelicula] FOREIGN KEY([ID_Pelicula])
REFERENCES [dbo].[Pelicula] ([ID_Pelicula])
GO
ALTER TABLE [dbo].[Visto] CHECK CONSTRAINT [FK_Pelicula_Vista_Pelicula]
GO
ALTER TABLE [dbo].[Visto]  WITH CHECK ADD  CONSTRAINT [FK_Pelicula_Vista_Usuario1] FOREIGN KEY([ID_Usuario])
REFERENCES [dbo].[Usuario] ([ID_Usuario])
GO
ALTER TABLE [dbo].[Visto] CHECK CONSTRAINT [FK_Pelicula_Vista_Usuario1]
GO
USE [master]
GO
ALTER DATABASE [DIAGRAMA] SET  READ_WRITE 
GO

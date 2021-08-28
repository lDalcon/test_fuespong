CREATE TABLE empresa (
	empid INT IDENTITY(500,1) PRIMARY KEY,
	empnit INT NOT NULL UNIQUE,
	empnombre VARCHAR(200) NOT NULL,
	emptelefono VARCHAR(50),
	empdireccion VARCHAR(200), 
	empemail VARCHAR(100)
)

CREATE TABLE usuario (
	usrid INT IDENTITY(100,1) PRIMARY KEY,
	usrnombre VARCHAR(1000) NOT NULL,
	usremail VARCHAR(200) NOT NULL UNIQUE,
	usrpass VARCHAR(400) NOT NULL,
	usrempid INT NOT NULL,
	usrfechacrea DATETIME,
	FOREIGN KEY (usrempid) REFERENCES empresa(empid)
)

CREATE TABLE proyecto (
	proid INT IDENTITY (1000,1) PRIMARY KEY,
	pronombre VARCHAR(200) NOT NULL,
	prousrid INT NOT NULL,
	proempid INT NOT NULL,
	profechacrea DATETIME NOT NULL,
	FOREIGN KEY (prousrid) REFERENCES usuario(usrid),
	FOREIGN KEY (proempid) REFERENCES empresa(empid),
)

CREATE TABLE historia_usuario (
	hurid INT IDENTITY(5000, 1) PRIMARY KEY,
	hurnombre VARCHAR (1000) NOT NULL, 
	hurrole VARCHAR(100) NOT NULL, 
	hurfuncionalidad VARCHAR (1000) NOT NULL, 
	hurbeneficio VARCHAR (1000) NOT NULL, 
	hurcriaceptacion VARCHAR(4000) NOT NULL,
	hurcomentarios VARCHAR(4000),
	hurproid INT NOT NULL,
	hurusridcrea INT NOT NULL,
	hurfechacrea DATETIME NOT NULL, 
	hurusridmod INT,
	hurfechamod DATETIME, 
	FOREIGN KEY (hurusridcrea) REFERENCES usuario(usrid),
	FOREIGN KEY (hurusridmod) REFERENCES usuario(usrid),
	FOREIGN KEY (hurproid) REFERENCES proyecto(proid),
)

CREATE TABLE ticket (
	ticid INT IDENTITY(10000, 1) PRIMARY KEY,
	ticnombre VARCHAR (1000) NOT NULL, 
	ticcomentarios VARCHAR(4000),
	tichurid INT NOT NULL,
	ticusridcrea INT NOT NULL,
	ticfechacrea DATETIME NOT NULL, 
	ticusridmod INT,
	ticfechamod DATETIME, 
	ticestado INT NOT NULL,
	FOREIGN KEY (ticusridcrea) REFERENCES usuario(usrid),
	FOREIGN KEY (ticusridmod) REFERENCES usuario(usrid),
	FOREIGN KEY (tichurid) REFERENCES historia_usuario(hurid)
)
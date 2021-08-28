/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_historia_crear
DESCRIPCION:	Registro en la tabla historia_usuario
CREADO:			25/08/2021
MODIFICADO:		
**********************************************************************************************************/

ALTER PROCEDURE sp_historia_crear
	@hurnombre VARCHAR (1000), 
	@hurrole VARCHAR(100), 
	@hurfuncionalidad VARCHAR (1000), 
	@hurbeneficio VARCHAR (1000), 
	@hurcriaceptacion VARCHAR(4000),
	@hurcomentarios VARCHAR(4000),
	@hurusridcrea INT,
	@hurproid INT,
	@ticnombre VARCHAR (1000), 
	@ticcomentarios VARCHAR(4000),
	@mensaje VARCHAR(4000) OUTPUT,
	@historia_usuario VARCHAR(MAX) OUTPUT
AS
	DECLARE  @n_ErrorNumber NUMERIC(20), @s_ErrorMessage VARCHAR(2000), @hurid INT
	BEGIN TRY
		INSERT INTO historia_usuario
			(
				hurnombre, 
				hurrole, 
				hurfuncionalidad, 
				hurbeneficio, 
				hurcriaceptacion,
				hurcomentarios,
				hurproid,
				hurusridcrea,
				hurfechacrea
			)
			VALUES
			(
				@hurnombre, 
				@hurrole, 
				@hurfuncionalidad, 
				@hurbeneficio, 
				@hurcriaceptacion,
				@hurcomentarios,
				@hurproid,
				@hurusridcrea,
				GETDATE()
			)
		SELECT @hurid = @@IDENTITY

		INSERT INTO ticket
			(
				ticnombre, 
				ticcomentarios,
				tichurid,
				ticusridcrea,
				ticfechacrea,
				ticestado
			)
			VALUES
			(
				@ticnombre, 
				@ticcomentarios,
				@hurid,
				@hurusridcrea,
				GETDATE(),
				1
			)
		
	/* Reotrna el id del nuevo usuario.*/
		SELECT @mensaje = 'Historia de usuario creada!'
		SELECT @historia_usuario = 
			(
				SELECT
					*
				FROM
					historia_usuario
				WHERE
					hurid = @@IDENTITY
				FOR JSON PATH, INCLUDE_NULL_VALUES
			)
	END TRY
	BEGIN CATCH 
		SELECT   
			@n_ErrorNumber = ERROR_NUMBER(),
			@s_ErrorMessage = ERROR_MESSAGE();

		SELECT @mensaje = 'No fue posible insertar la historia de usuario. Error:' + CONVERT(varchar(20), @n_ErrorNumber) + ' ' + @s_ErrorMessage
		RETURN
	END CATCH

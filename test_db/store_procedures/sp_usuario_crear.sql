/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_usuario_crear
DESCRIPCION:	Registro en la tabla usuario
CREADO:			25/08/2021
MODIFICADO:		
**********************************************************************************************************/

CREATE PROCEDURE sp_usuario_crear
	@usrnombre VARCHAR(1000),
	@usremail VARCHAR(200),
	@usrpass VARCHAR(400),
	@usrempid INT,
	@mensaje VARCHAR(4000) OUTPUT
AS
	DECLARE  @n_ErrorNumber numeric(20), @s_ErrorMessage varchar(2000)
	BEGIN TRY
		INSERT INTO usuario VALUES
			(
				@usrnombre,
				@usremail,
				@usrpass,
				@usrempid,
				GETDATE()
			)
		
	/* Reotrna el id del nuevo usuario.*/
		SELECT @mensaje = 'Usuario creado!'
	END TRY
	BEGIN CATCH 
		SELECT   
			@n_ErrorNumber = ERROR_NUMBER(),
			@s_ErrorMessage = ERROR_MESSAGE();

		SELECT @mensaje = 'No fue posible insertar el usuario. Error:' + CONVERT(varchar(20), @n_ErrorNumber) + ' ' + @s_ErrorMessage
		RETURN
	END CATCH

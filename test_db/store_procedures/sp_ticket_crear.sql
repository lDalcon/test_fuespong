/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_ticket_crear
DESCRIPCION:	Registro en la tabla ticket
CREADO:			25/08/2021
MODIFICADO:		
**********************************************************************************************************/

ALTER PROCEDURE sp_ticket_crear
	@ticnombre VARCHAR (1000), 
	@ticcomentarios VARCHAR(4000),
	@tichurid INT,
	@ticusridcrea INT,
	@mensaje VARCHAR(4000) OUTPUT,
	@ticket VARCHAR(MAX) OUTPUT
AS
	DECLARE  @n_ErrorNumber numeric(20), @s_ErrorMessage varchar(2000)
	BEGIN TRY
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
				@tichurid,
				@ticusridcrea,
				GETDATE(),
				1
			)
		
	/* Reotrna el id del nuevo usuario.*/
		SELECT @mensaje = 'Ticket creado!'
		SELECT @ticket = 
			(
				SELECT
					*
				FROM
					ticket
				WHERE
					ticid = @@IDENTITY
				FOR JSON PATH, INCLUDE_NULL_VALUES
			)
	END TRY
	BEGIN CATCH 
		SELECT   
			@n_ErrorNumber = ERROR_NUMBER(),
			@s_ErrorMessage = ERROR_MESSAGE();

		SELECT @mensaje = 'No fue posible insertar el ticket. Error:' + CONVERT(varchar(20), @n_ErrorNumber) + ' ' + @s_ErrorMessage
		RETURN
	END CATCH

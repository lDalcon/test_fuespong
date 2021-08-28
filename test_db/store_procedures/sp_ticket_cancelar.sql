/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_ticket_cancelar
DESCRIPCION:	Cancela un ticket en estado activo
CREADO:			27/08/2021
MODIFICADO:		
**********************************************************************************************************/

CREATE PROCEDURE sp_ticket_cancelar
	@ticid INT,
	@mensaje VARCHAR(4000) OUTPUT
AS
	DECLARE  @n_ErrorNumber NUMERIC(20), @s_ErrorMessage VARCHAR(2000), @hurid INT
	BEGIN TRY
		UPDATE ticket
			SET 
				ticestado = 4
		WHERE
			ticid = @ticid
			AND ticestado = 1
		
		SELECT @mensaje = 'Ticket actualizado!'
	END TRY
	BEGIN CATCH 
		SELECT   
			@n_ErrorNumber = ERROR_NUMBER(),
			@s_ErrorMessage = ERROR_MESSAGE();

		SELECT @mensaje = 'No fue posible insertar la historia de usuario. Error:' + CONVERT(varchar(20), @n_ErrorNumber) + ' ' + @s_ErrorMessage
		RETURN
	END CATCH

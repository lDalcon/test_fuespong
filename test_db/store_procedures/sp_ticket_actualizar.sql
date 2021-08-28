/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_ticket_actualizar
DESCRIPCION:	Registro en la tabla ticket
CREADO:			25/08/2021
MODIFICADO:		
**********************************************************************************************************/

ALTER PROCEDURE sp_ticket_actualizar
	@ticid INT,
	@tichurid INT,
	@ticnombre VARCHAR (1000), 
	@ticcomentarios VARCHAR(4000),
	@ticusridmod INT,
	@ticestado INT,
	@mensaje VARCHAR(4000) OUTPUT
AS
	DECLARE  @n_ErrorNumber numeric(20), @s_ErrorMessage varchar(2000)
	BEGIN TRY
		UPDATE ticket
			SET
				ticnombre = @ticnombre, 
				ticcomentarios = @ticcomentarios,
				ticestado = @ticestado,
				ticusridmod = @ticusridmod,
				ticfechamod = GETDATE()
		WHERE
			ticid = @ticid
			AND tichurid = @tichurid
		
		SELECT @mensaje = 'Ticket actualizado!'
	END TRY
	BEGIN CATCH 
		SELECT   
			@n_ErrorNumber = ERROR_NUMBER(),
			@s_ErrorMessage = ERROR_MESSAGE();

		SELECT @mensaje = 'No fue posible actualizar el ticket. Error:' + CONVERT(varchar(20), @n_ErrorNumber) + ' ' + @s_ErrorMessage
		RETURN
	END CATCH

/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_ticket_listar
DESCRIPCION:	Lista los productos en la tabla producto
CREADO:			10/08/2021
MODIFICADO:		
**********************************************************************************************************/

CREATE PROCEDURE sp_ticket_listar
	@filtros VARCHAR(4000) = NULL,
	@mensaje VARCHAR(4000) OUTPUT
AS
	IF @filtros IS NULL or @filtros = ''

		SELECT
			*
		FROM
			ticket
		FOR JSON PATH
	
	ELSE
		BEGIN
			DECLARE @sql VARCHAR(MAX)
			SET @sql = 'SELECT
							*
						FROM
							ticket
						WHERE ' + @filtros + ' FOR JSON PATH'
			exec (@sql)
		END
	
	
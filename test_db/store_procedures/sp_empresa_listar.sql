/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_empresa_listar
DESCRIPCION:	Lista las empresas registradas
CREADO:			10/08/2021
MODIFICADO:		
**********************************************************************************************************/

CREATE PROCEDURE sp_empresa_listar
	@empresas VARCHAR(4000) OUTPUT
AS
		SELECT @empresas = 
		(
			SELECT
			*
			FROM
				empresa
			FOR JSON PATH
		)
	

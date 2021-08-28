/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_usuario_login
DESCRIPCION:	Consulta de objeto usuario para inicio de sesión
CREADO:			24/08/2021
MODIFICADO:		
**********************************************************************************************************/

CREATE PROCEDURE sp_usuario_login
	@usremail VARCHAR(100),
	@usuario VARCHAR(4000) OUTPUT
AS
	SET @usuario = (
		SELECT
			*
		FROM
			usuario
		WHERE
			usremail = @usremail
		FOR JSON PATH, INCLUDE_NULL_VALUES
	)
	
/*********************************************************************************************************
AUTOR:			DAMIAN DUARTE
NOMBRE:			sp_proyecto_listar
DESCRIPCION:	Lista los proyectos creados por empresa
CREADO:			27/08/2021
MODIFICADO:		
**********************************************************************************************************/

ALTER PROCEDURE sp_proyecto_listar
	@empid INT,
	@proyectos VARCHAR(MAX) OUTPUT
AS
	SELECT @proyectos = 
	(
		SELECT
		*,
			(
				SELECT
					*,
					(
						SELECT
							*
						FROM
							ticket
						WHERE
							tichurid = hurid
						FOR JSON PATH, INCLUDE_NULL_VALUES
					)hurtickets
				FROM
					historia_usuario
				WHERE
					hurproid = proid
				FOR JSON PATH, INCLUDE_NULL_VALUES
			)prohistorias
		FROM
			proyecto
		WHERE
			proempid = @empid
		FOR JSON PATH, INCLUDE_NULL_VALUES
	)
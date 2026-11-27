# ADR-002 · Enlace al issue en los tokens

- **Estado:** Propuesto
- **Fecha:** 2026-11-26
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

El principio 2 del [ADR-001](001-alcance.md) dice que un token nuevo solo se añade cuando su issue está aprobado, y que queda enlazado desde un comentario junto al token. Su tabla de comprobación habla de `src/index.css`.

Los tokens se diseñan ahora en `tokens/tokens.json`, en formato DTCG. JSON no admite comentarios. Además, el ADR-001 no dice cómo se deja constancia de que un issue está aprobado.

## Decisión

- En `tokens/tokens.json`, cada token nuevo guarda el enlace completo a su issue en `$extensions`, el campo que DTCG reserva para datos adicionales, con la clave `com.lumine.issue`:

  ```json
  "$extensions": { "com.lumine.issue": "https://github.com/RileyBlue/Lumine-DS/issues/18" }
  ```

- Un issue está aprobado cuando quien mantiene Lumine-DS escribe en él un comentario que dice «Aprobado».
- Esto sustituye, solo para `tokens/tokens.json`, al comentario junto al token que pide el ADR-001. Todo lo demás del principio 2 sigue igual.
- Se aplica desde este ADR. Los tokens anteriores no necesitan enlace.

### Cómo se comprueba

Si la PR añade un token en `tokens/tokens.json`, el token tiene `com.lumine.issue` y el issue enlazado tiene el comentario de aprobación.

## Consecuencias

- El enlace viaja con el token y se puede leer con un programa.
- `$description` queda solo para explicar cuándo usar el token.
- La revisión sigue siendo manual.
- Si los tokens se conectan con `src/index.css`, habrá que decidir si el enlace se repite allí como comentario.

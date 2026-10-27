# Sitio oficial de ParFlix

Sitio estático de presentación de ParFlix, publicado con GitHub Pages en
<https://andrespar2.github.io/>.

## Contenido

- `index.html`: página principal (presentación, características, vista previa,
  descarga, novedades, publicidad, proyecto y política de privacidad).
- `style.css`: identidad visual AMOLED, diseño responsive y animaciones sutiles.
- `script.js`: mejoras progresivas (cabecera, animaciones, última release y
  comprobación visual de los espacios publicitarios).

No se usan frameworks, fuentes externas ni imágenes de terceros. La vista previa
de la interfaz es una representación construida con CSS.

## Publicidad

El sitio integra dos unidades de Adsterra en el dominio registrado
`andrespar2.github.io`:

- Banner 320×50 en la sección de descarga.
- Native Banner en una sección independiente, con etiqueta visible.

Los códigos se insertan sin modificar sus claves ni su funcionamiento interno.
No hay recargas automáticas, reintentos agresivos ni impresiones artificiales.
Si una unidad no carga, la página sigue siendo navegable y el contenedor no
rompe el diseño.

La aplicación Android carga páginas dedicadas del mismo sitio aprobado:
`ad-banner.html` para el banner 320×50 y `ad-native.html?app=1` para una tarjeta
nativa compacta. No se inyecta la etiqueta en un documento local ni se falsifica
el origen, el User-Agent o las métricas. El banner se omite en WebView anteriores
a la versión principal 100 y se retira si no hay creatividad visible; el anuncio
nativo se oculta si el proveedor no devuelve contenido. La app sigue funcionando
aunque la publicidad falle.

El propietario de ParFlix autorizó el uso de las unidades web en WebView bajo su
responsabilidad. Adsterra no ha emitido una aprobación escrita específica para
este uso. Los códigos se insertan sin modificar sus claves ni su funcionamiento
interno. No hay recargas automáticas, reintentos agresivos ni impresiones
artificiales.

## app-ads.txt / ads.txt

Se retiró `app-ads.txt` porque contenía exclusivamente registros del proveedor
anterior y ya no representa la monetización vigente. No se inventan registros
para Adsterra: cualquier archivo `ads.txt` debe generarse desde la cuenta real
del publisher cuando corresponda.

## Desarrollo local

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor
estático. No requiere compilación.

## Privacidad

La política de privacidad pública está incluida en la sección `#privacidad` de
`index.html` e incluye el uso de servicios de terceros y publicidad.

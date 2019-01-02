from PIL import Image
import urllib.request
import io

URL = 'http://localhost:5000/image/6b242a1f47cdcab434b9a51b763b0369.jpeg'

with urllib.request.urlopen(URL) as url:
    f = io.BytesIO(url.read())

img = Image.open(f)

img.show()


















export async function uploadFile() {
    try {
        const [imageFile] = await window.showOpenFilePicker({
            types: [{
                description: "Images",
                accept: {"image/*": [".png", ".gif", ".jpeg", ".jpg"]},
            }],
            excludeAcceptAllOption: true,
            multiple: false,
        })

        const file = await imageFile.getFile()
        const img = new Image()
        img.src = URL.createObjectURL(file)

        img.onerror = function () {
            URL.revokeObjectURL(this.src)
            console.error("Cannot load image")
        }

        return new Promise<HTMLImageElement>(resolve => {
            img.onload = function () {
                URL.revokeObjectURL(img.src)
                resolve(img)
            }
        })
    }
    catch(e) {
        console.error(e)
    }
}

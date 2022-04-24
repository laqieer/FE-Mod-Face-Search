class App {
    constructor() {
        this.refMap = new Map();
        this.file = null;
        this.upload = document.getElementById( 'file' );
        this.upload.addEventListener( 'change', evt => this.doUpload( evt ) );
        this.preview = document.getElementById( 'preview' );
        fetch("https://raw.githubusercontent.com/laqieer/FE-Mod-Face-Search/main/refMap.json")
        .then(blob => blob.json())
        .then(data => this.refMap = data);
    }
    
    async doUpload( event ) {
        this.file = event.target.files[0];
        const bitmap = await createImageBitmap( this.file );
        this.preview.width = bitmap.width;
        this.preview.height = bitmap.height;
        var ctx = this.preview.getContext("2d");
        ctx.drawImage( bitmap, 0, 0 );
        var imgData = ctx.getImageData( 0, 0, bitmap.width, bitmap.height );
        var hash = bmvbhash( imgData, 8 );
        console.log( 'Hash: ' + hash );
        console.log( this.refMap[hash] );
    };
}

let app = new App();
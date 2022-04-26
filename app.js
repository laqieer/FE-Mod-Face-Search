class App {
    constructor() {
        this.refMap = new Map();
        this.files = [];
        this.file = null;
        this.upload = document.getElementById( 'file' );
        this.upload.addEventListener( 'change', evt => this.doUpload( evt ) );
        this.preview = document.getElementById( 'preview' );
        this.result = document.getElementById( 'result' );
        fetch("https://raw.githubusercontent.com/laqieer/FE-Mod-Face-Search/main/refMap.json")
        .then(blob => blob.json())
        .then(data => this.refMap = data);
        fetch("https://raw.githubusercontent.com/laqieer/FE-Mod-Face-Search/main/files.json")
        .then(blob => blob.json())
        .then(data => this.files = data);
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
        var imgs = this.refMap[hash];
        if ( imgs == undefined ) {
            imgs = []
        }
        this.result.innerHTML = '<b>' + imgs.length + ' results found.' + '</b>';
        for ( var i in imgs ) {
            this.result.appendChild( document.createElement('br') );
            var id = imgs[i].replace( /[^0-9]/ig, '' );
            var file = this.files[id];
            if ( file != undefined ) {
                this.result.appendChild( document.createTextNode( file ) );
            }
            this.result.appendChild( document.createElement('br') );
            var img = document.createElement( 'img' );
            img.src = imgs[i];
            this.result.appendChild( img );
        }
    };
}

let app = new App();
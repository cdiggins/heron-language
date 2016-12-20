"use strict"

function EffectPass( renderer, precission, supportDerivatives, supportsTextureLOD, callback, obj, forceMuted, forcePaused, outputGainNode, copyProgram, id  )
{
    this.mID = id;
    this.mInputs = [null, null, null, null ];
    this.mOutputs = [null, null, null, null ];
    this.mSource = null;
    this.mGainNode = outputGainNode;

    this.mRenderer = renderer;
    this.mProgramCopy = copyProgram; 

    this.mType = "image";
    this.mName = "none";
    this.mFrame = 0;

    this.mPrecision = precission;
    this.mSupportsDerivatives = supportDerivatives;
    this.mSupportsTextureLOD = supportsTextureLOD;
    this.mTextureCallbackFun = callback;
    this.mTextureCallbackObj = obj;
    this.mForceMuted = forceMuted;
    this.mForcePaused = forcePaused;
}

EffectPass.prototype.MakeHeader_Image = function()
{
    var header = "";
    var headerlength = 0;

    if( this.mSupportsDerivatives ) { header += "#extension GL_OES_standard_derivatives : enable\n"; headerlength++; }
    if( this.mSupportsTextureLOD  ) { header += "#extension GL_EXT_shader_texture_lod : enable\n"; headerlength++; }


    header += this.mPrecision;
    headerlength += 3;

    header += "uniform vec3      iResolution;\n" +
              "uniform float     iGlobalTime;\n" +
              "uniform float     iChannelTime[4];\n" +
              "uniform vec4      iMouse;\n" +
              "uniform vec4      iDate;\n" +
              "uniform float     iSampleRate;\n" +
              "uniform vec3      iChannelResolution[4];\n" +
              "uniform int       iFrame;\n" +
              "uniform float     iTimeDelta;\n" +
              "uniform float     iFrameRate;\n";
    headerlength += 10;

    header += "struct Channel\n";
    header += "{\n";
    header += "    vec3  resolution;\n";
    header += "    float time;\n";
    header += "};\n";
    header += "uniform Channel iChannel[4];\n";
    headerlength += 6;

    for( var i=0; i<this.mInputs.length; i++ )
    {
        var inp = this.mInputs[i];

        if( inp!=null && inp.mInfo.mType=="cubemap" )
            header += "uniform samplerCube iChannel" + i + ";\n";
        else
            header += "uniform sampler2D iChannel" + i + ";\n";
        headerlength++;
    }

    if( this.mSupportsTextureLOD  )
    { 
        //header += "vec4 texture2DGrad( const sampler2D s, in vec2 uv, in vec2 gx, in vec2 gy ) { return texture2DGradEXT( s, uv, gx, gy ); }\n"; 
        //header += "vec4 texture2DLod( const sampler2D s, in vec2 uv, in float lod ) { return texture2DLodEXT( s, uv, lod ); }\n"; 
        //header += "#define texture2DGrad texture2DGradEXT\n"; 
        //header += "#define texture2DLod texture2DLodEXT\n"; 
        //headerlength+=2;
    }
    else
    { 
        header += "vec4 texture2DGrad( sampler2D s, in vec2 uv, vec2 gx, vec2 gy ) { return texture2D( s, uv ); }\n"; 
        header += "vec4 texture2DLod( sampler2D s, in vec2 uv, in float lod ) { return texture2D( s, uv ); }\n"; 
        headerlength+=2;
    }


	header += "void mainImage( out vec4 c,  in vec2 f );\n"
	headerlength += 1;

    this.mImagePassFooter = "\nvoid main( void )" +
    "{" +
        "vec4 color = vec4(0.0,0.0,0.0,1.0);" +
        "mainImage( color, gl_FragCoord.xy );" +
        "color.w = 1.0;" +
        "gl_FragColor = color;" +
    "}";

    this.mImagePassFooterVR = "\n" +
    "uniform vec4 unViewport;\n" +
    "uniform vec3 unCorners[5];\n" +
    "void main( void )" +
    "{" +
        "vec4 color = vec4(0.0,0.0,0.0,1.0);" +

        "vec3 ro = unCorners[4];" +
        "vec2 uv = (gl_FragCoord.xy - unViewport.xy)/unViewport.zw;" + 
        "vec3 rd = normalize( mix( mix( unCorners[0], unCorners[1], uv.x )," +
                                  "mix( unCorners[3], unCorners[2], uv.x ), uv.y ) - ro);" + 

        "mainVR( color, gl_FragCoord.xy-unViewport.xy, ro, rd );" +
        "color.w = 1.0;" +
        "gl_FragColor = color;" +
    "}";


    this.mHeader = header;
    this.mHeaderLength = headerlength;
}

EffectPass.prototype.MakeHeader_Buffer = function()
{
    var header = "";
    var headerlength = 0;

    if( this.mSupportsDerivatives ) { header += "#extension GL_OES_standard_derivatives : enable\n"; headerlength++; }
    if( this.mSupportsTextureLOD  ) { header += "#extension GL_EXT_shader_texture_lod : enable\n"; headerlength++; }


    header += this.mPrecision;
    headerlength += 3;

    header += "uniform vec3      iResolution;\n" +
              "uniform float     iGlobalTime;\n" +
              "uniform float     iChannelTime[4];\n" +
              "uniform vec4      iMouse;\n" +
              "uniform vec4      iDate;\n" +
              "uniform float     iSampleRate;\n" +
              "uniform vec3      iChannelResolution[4];\n" +
              "uniform int       iFrame;\n" +
              "uniform float     iTimeDelta;\n" +
              "uniform float     iFrameRate;\n";
    headerlength += 10;

    for( var i=0; i<this.mInputs.length; i++ )
    {
        var inp = this.mInputs[i];

        if( inp!=null && inp.mInfo.mType=="cubemap" )
            header += "uniform samplerCube iChannel" + i + ";\n";
        else
            header += "uniform sampler2D iChannel" + i + ";\n";
        headerlength++;
    }

	header += "void mainImage( out vec4 c,  in vec2 f );\n"
	headerlength += 1;

    this.mImagePassFooter = "\nvoid main( void )" +
    "{" +
        "vec4 color = vec4(0.0,0.0,0.0,1.0);" +
        "mainImage( color, gl_FragCoord.xy );" +
        "gl_FragColor = color;" +
    "}";

    this.mImagePassFooterVR = "\n" +
    "uniform vec4 unViewport;\n" +
    "uniform vec3 unCorners[5];\n" +
    "void main( void )" +
    "{" +
        "vec4 color = vec4(0.0,0.0,0.0,1.0);" +

        "vec3 ro = unCorners[4];" +
        "vec2 uv = (gl_FragCoord.xy - unViewport.xy)/unViewport.zw;" + 
        "vec3 rd = normalize( mix( mix( unCorners[0], unCorners[1], uv.x )," +
                                  "mix( unCorners[3], unCorners[2], uv.x ), uv.y ) - ro);" + 

        "mainVR( color, gl_FragCoord.xy-unViewport.xy, ro, rd );" +
        "gl_FragColor = color;" +
    "}";


    this.mHeader = header;
    this.mHeaderLength = headerlength;
}

EffectPass.prototype.MakeHeader_Sound = function()
{
    var header = this.mPrecision;
    var headerlength = 3;

    if( this.mSupportsDerivatives ) { header += "#extension GL_OES_standard_derivatives : enable\n"; headerlength++; }
    if( this.mSupportsTextureLOD  ) { header += "#extension GL_EXT_shader_texture_lod : enable\n"; headerlength++; }

    header += "uniform float     iChannelTime[4];\n" +
              "uniform float     iBlockOffset;\n" +
              "uniform vec4      iDate;\n" +
              "uniform float     iSampleRate;\n" +
              "uniform vec3      iChannelResolution[4];\n";
    headerlength += 5;

    for( var i=0; i<this.mInputs.length; i++ )
    {
        var inp = this.mInputs[i];

        if( inp!=null && inp.mInfo.mType=="cubemap" )
            header += "uniform samplerCube iChannel" + i + ";\n";
        else
            header += "uniform sampler2D iChannel" + i + ";\n";
        headerlength++;
    }

    this.mHeader = header;
    this.mHeaderLength = headerlength;
}

EffectPass.prototype.MakeHeader = function()
{
         if( this.mType=="image" ) this.MakeHeader_Image();
    else if( this.mType=="sound" ) this.MakeHeader_Sound();
    else                           this.MakeHeader_Buffer();
}

EffectPass.prototype.Create_Image = function( wa )
{
    this.MakeHeader();
    this.mSampleRate = 44100;
    this.mSupportsVR = false;
    this.mProgram = null;
    this.mProgramVR = null;
}
EffectPass.prototype.Destroy_Image = function( wa )
{
}

EffectPass.prototype.Create_Buffer = function( wa )
{
    this.MakeHeader();
    this.mSampleRate = 44100;
    this.mSupportsVR = false;
    this.mProgram = null;
    this.mProgramVR = null;
}
EffectPass.prototype.Destroy_Buffer = function( wa )
{
}

EffectPass.prototype.Create_Sound = function( wa )
{
    this.MakeHeader();


    this.mSoundPassFooter = "void main()" +
    "{" +
        "float t = iBlockOffset + ((gl_FragCoord.x-0.5) + (gl_FragCoord.y-0.5)*512.0)/iSampleRate;" +
        "vec2 y = mainSound( t );" +
        "vec2 v  = floor((0.5+0.5*y)*65536.0);" +
        "vec2 vl =   mod(v,256.0)/255.0;" +
        "vec2 vh = floor(v/256.0)/255.0;" +
        "gl_FragColor = vec4(vl.x,vh.x,vl.y,vh.y);" +
    "}";

    this.mProgram = null;

    this.mSampleRate = 44100;
    this.mPlayTime = 60*3;
    this.mPlaySamples = this.mPlayTime*this.mSampleRate;
    this.mBuffer = wa.createBuffer( 2, this.mPlaySamples, this.mSampleRate );

    //-------------------
    this.mTextureDimensions = 512;
    this.mRenderTexture = this.mRenderer.CreateTexture(this.mRenderer.TEXTYPE.T2D, 
                                                       this.mTextureDimensions, this.mTextureDimensions,
                                                       this.mRenderer.TEXFMT.C4I8,
                                                       this.mRenderer.FILTER.NONE,
                                                       this.mRenderer.TEXWRP.CLAMP, null);
    this.mRenderFBO = this.mRenderer.CreateRenderTarget(this.mRenderTexture, null, null, null, null, false);

    //-----------------------------

    // ArrayBufferView pixels;
    this.mTmpBufferSamples = this.mTextureDimensions*this.mTextureDimensions;
    this.mData = new Uint8Array( this.mTmpBufferSamples*4 );

    this.mPlayNode = null;
}

EffectPass.prototype.Destroy_Sound = function( wa )
{
    if( this.mPlayNode!=null ) this.mPlayNode.stop();
    this.mPlayNode = null;
    this.mBuffer = null;
    this.mData = null;

    this.mRenderer.DestroyRenderTarget(this.mRenderFBO);
    this.mRenderer.DestroyTexture(this.mRenderTexture);
}

EffectPass.prototype.Create = function( passType, passName, wa )
{
    this.mType = passType;
    this.mName = passName;
    this.mSource = null;

         if( passType=="image" ) this.Create_Image( wa );
    else if( passType=="sound" ) this.Create_Sound( wa );
    else                         this.Create_Buffer( wa );
}

EffectPass.prototype.Destroy = function( wa )
{
    this.mSource = null;
         if( this.mType=="image" ) this.Destroy_Image( wa );
    else if( this.mType=="sound" ) this.Destroy_Sound( wa );
    else                           this.Destroy_Buffer( wa );
}

EffectPass.prototype.NewShader_Sound = function( shaderCode )
{
    if( this.mRenderer==null ) return "No GL";

    var vsSource   = "attribute vec2 pos; void main() { gl_Position = vec4(pos.xy,0.0,1.0); }";

    var res = this.mRenderer.CreateShader( vsSource, this.mHeader + shaderCode + this.mSoundPassFooter );
    if( res.mResult == false )
        return res.mInfo;

    if( this.mProgram != null )
        this.mRenderer.DestroyShader( this.mProgram );

    this.mProgram = res;

    // force sound to be regenerated
    this.mFrame = 0;

    return null;
}

EffectPass.prototype.NewShader_Image = function( shaderCode )
{
    if( this.mRenderer==null ) return "No GL";

    //--------------
    {
        var vsSource   = "attribute vec2 pos; void main() { gl_Position = vec4(pos.xy,0.0,1.0); }";

        var res = this.mRenderer.CreateShader(vsSource, this.mHeader + shaderCode + this.mImagePassFooter);
        if (res.mResult == false)
            return res.mInfo;

        if( this.mProgram != null )
            this.mRenderer.DestroyShader( this.mProgram );

        this.mProgram = res;
    }
    //--------------

    this.mSupportsVR = false;

    var n1 = shaderCode.indexOf("mainVR(");
    var n2 = shaderCode.indexOf("mainVR (");
    var n3 = shaderCode.indexOf("mainVR  (");
    if( n1>0 || n2>0 || n3>0 )
    {
        var vsSourceVR = "attribute vec2 pos; void main() { gl_Position = vec4(pos.xy,0.0,1.0); }";

        var res = this.mRenderer.CreateShader(vsSource, this.mHeader + shaderCode + this.mImagePassFooterVR );
        if( res.mResult == false )
            return res.mInfo;

        if( this.mProgramVR != null )
            this.mRenderer.DestroyShader( this.mProgramVR );

        this.mSupportsVR = true;
        this.mProgramVR = res;
    }

    return null;
}

EffectPass.prototype.NewShader = function( shaderCode )
{
    var res = null;

    if( this.mType=="sound" ) res = this.NewShader_Sound( shaderCode );
    else                      res = this.NewShader_Image( shaderCode );

    this.mSource = shaderCode;

    return res;
}


EffectPass.prototype.DestroyInput = function( id )
{
    if( this.mInputs[id]==null ) return;

    if( this.mInputs[id].mInfo.mType=="texture" )
    {
        if( this.mInputs[id].globject != null )
            this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }
    else if( this.mInputs[id].mInfo.mType=="webcam" )
    {
        this.mInputs[id].video.pause();
        this.mInputs[id].video.src = "";
        var tracks = this.mInputs[id].video.stream.getVideoTracks();
        if( tracks ) tracks[0].stop();
        this.mInputs[id].video = null;
        if( this.mInputs[id].globject != null )
            this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }
    else if( this.mInputs[id].mInfo.mType=="video" )
    {
        this.mInputs[id].video.pause();
        this.mInputs[id].video = null;
        if( this.mInputs[id].globject != null )
            this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }
    else if( this.mInputs[id].mInfo.mType=="music" || this.mInputs[id].mInfo.mType=="musicstream")
    {
        this.mInputs[id].audio.pause();
        this.mInputs[id].audio.mSound.mFreqData = null;
        this.mInputs[id].audio.mSound.mWaveData = null;
        this.mInputs[id].audio = null;
        if( this.mInputs[id].globject != null )
            this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }
    else if( this.mInputs[id].mInfo.mType=="cubemap" )
    {
        if( this.mInputs[id].globject != null )
            this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }
    else if( this.mInputs[id].mInfo.mType=="keyboard" )
    {
        //if( this.mInputs[id].globject != null )
          //  this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }
    else if( this.mInputs[id].mInfo.mType=="mic" )
    {
        this.mInputs[id].mic = null;
        if( this.mInputs[id].globject != null )
            this.mRenderer.DestroyTexture(this.mInputs[id].globject);
    }

    this.mInputs[id] = null;
}

EffectPass.prototype.TooglePauseInput = function( id )
{
    var me = this;
    var inp = this.mInputs[id];

    if( inp==null )
    {
    }
    else if( inp.mInfo.mType=="texture" )
    {
    }
    else if( inp.mInfo.mType=="video" )
    {
        if( inp.video.mPaused )
        {
            inp.video.play();
            inp.video.mPaused = false;
        }
        else
        {
            inp.video.pause();
            inp.video.mPaused = true;
        }
        return inp.video.mPaused;
    }
    else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream")
    {
        if( inp.audio.mPaused )
        {
            inp.audio.play();
            inp.audio.mPaused = false;
        }
        else
        {
            inp.audio.pause();
            inp.audio.mPaused = true;
        }
        return inp.audio.mPaused;
    }

    return null;
}

EffectPass.prototype.StopInput = function( id )
{
    var inp = this.mInputs[id];

    if( inp==null )
    {
    }
    else if( inp.mInfo.mType=="texture" )
    {
    }
    else if( inp.mInfo.mType=="video" )
    {
        if( inp.video.mPaused == false )
        {
            inp.video.pause();
            inp.video.mPaused = true;
        }
        return inp.video.mPaused;
    }
    else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream" )
    {
        if( inp.audio.mPaused == false )
        {
            inp.audio.pause();
            inp.audio.mPaused = true;
        }
        return inp.audio.mPaused;
    }
    return null;
}

EffectPass.prototype.ResumeInput = function( id )
{
    var inp = this.mInputs[id];

    if( inp==null )
    {
    }
    else if( inp.mInfo.mType=="texture" )
    {
    }
    else if( inp.mInfo.mType=="video" )
    {
        if( inp.video.mPaused )
        {
            inp.video.play();
            inp.video.mPaused = false;
        }
        return inp.video.mPaused;
    }
    else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream" )
    {
        if( inp.audio.mPaused )
        {
            inp.audio.play();
            inp.audio.mPaused = false;
        }
        return inp.audio.mPaused;
    }
    return null;
}

EffectPass.prototype.RewindInput = function( id )
{
    var me = this;
    var inp = this.mInputs[id];

    if( inp==null )
    {
    }
    else if( inp.mInfo.mType=="texture" )
    {
    }
    else if( inp.mInfo.mType=="video" )
    {
        if( inp.loaded )
        {
            inp.video.currentTime = 0;
        }
    }
    else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream")
    {
        if( inp.loaded )
        {
            inp.audio.currentTime = 0;
        }
    }
}

EffectPass.prototype.MuteInput = function( wa, id )
{
    var me = this;
    var inp = this.mInputs[id];

    if( inp==null )
    {
    }
    else if( inp.mInfo.mType=="texture" )
    {
    }
    else if( inp.mInfo.mType=="video" )
    {
        if( inp.video.mMuted )
        {
            inp.video.muted = false;
            //inp.video.volume = 100;
            inp.video.mMuted = false;
        }
        else
        {
            inp.video.muted = true;
            //inp.video.volume = 0;
            inp.video.mMuted = true;
        }
        return inp.video.mMuted;
    }
    else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream")
    {
        if( inp.audio.mMuted )
        {
            if( wa != null )
                inp.audio.mSound.mGain.gain.value = 1.0;
            inp.audio.mMuted = false;
        }
        else
        {
            if( wa != null )
                inp.audio.mSound.mGain.gain.value = 0.0;
            inp.audio.mMuted = true;
        }
        return inp.audio.mMuted;
    }

    return null;
}

EffectPass.prototype.UpdateInputs = function( wa, forceUpdate, keyboard )
{
   for( var i=0; i<this.mInputs.length; i++ )
   {
        var inp = this.mInputs[i];

        if( inp==null )
        {
            if( forceUpdate )
            {
              if( this.mTextureCallbackFun!=null )
                  this.mTextureCallbackFun( this.mTextureCallbackObj, i, null, false, 0, 0, -1.0, this.mID );
            }
        }
        else if( inp.mInfo.mType=="texture" )
        {
            if( inp.loaded && forceUpdate )
            {
              if( this.mTextureCallbackFun!=null )
                  this.mTextureCallbackFun( this.mTextureCallbackObj, i, inp.image, true, 1, 1, -1.0, this.mID );
            }

        }
        else if( inp.mInfo.mType=="cubemap" )
        {
            if( inp.loaded && forceUpdate )
            {
              if( this.mTextureCallbackFun!=null )
                  this.mTextureCallbackFun( this.mTextureCallbackObj, i, inp.image[0], true, 2, 1, -1.0, this.mID );
            }

        }
        else if( inp.mInfo.mType=="keyboard" )
        {
            if( this.mTextureCallbackFun!=null )
                this.mTextureCallbackFun( this.mTextureCallbackObj, i, {mImage:keyboard.mIcon,mData:keyboard.mData}, false, 6, 0, -1.0, this.mID );
        }
        else if( inp.mInfo.mType=="video" )
        {
            if( inp.video.readyState === inp.video.HAVE_ENOUGH_DATA )
            {
                if( this.mTextureCallbackFun!=null )
                    this.mTextureCallbackFun( this.mTextureCallbackObj, i, inp.video, false, 3, 1, -1, this.mID );
            }
        }
        else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream" )
        {
              if( inp.loaded && inp.audio.mPaused == false && inp.audio.mForceMuted == false )
              {
                  if( wa != null )
                  {
                      inp.audio.mSound.mAnalyser.getByteFrequencyData(  inp.audio.mSound.mFreqData );
                      inp.audio.mSound.mAnalyser.getByteTimeDomainData( inp.audio.mSound.mWaveData );
                  }

                  if (this.mTextureCallbackFun!=null)
                  {
                           if (inp.mInfo.mType == "music")       this.mTextureCallbackFun(this.mTextureCallbackObj, i, {wave:(wa==null)?null:inp.audio.mSound.mFreqData}, false, 4, 1, inp.audio.currentTime, this.mID);
                      else if (inp.mInfo.mType == "musicstream") this.mTextureCallbackFun(this.mTextureCallbackObj, i, {wave:(wa==null)?null:inp.audio.mSound.mFreqData, info: inp.audio.soundcloudInfo}, false, 8, 1, inp.audio.currentTime, this.mID);
                  }
              }
        }
        else if( inp.mInfo.mType=="mic" )
        {
              if( inp.loaded && inp.mForceMuted == false )
              {
                  if( wa != null )
                  {
                      inp.mAnalyser.getByteFrequencyData(  inp.mFreqData );
                      inp.mAnalyser.getByteTimeDomainData( inp.mWaveData );
                  }
                  if( this.mTextureCallbackFun!=null )
                      this.mTextureCallbackFun( this.mTextureCallbackObj, i, {wave: ((wa==null)?null:inp.mFreqData) }, false, 5, 1, 0, this.mID );
              }
        }
        else if( inp.mInfo.mType=="buffer" )
        {
            if( inp.loaded && forceUpdate )
            {
              if( this.mTextureCallbackFun!=null )
                  this.mTextureCallbackFun( this.mTextureCallbackObj, i, {texture:inp.image, data:null}, true, 9, 1, -1.0, this.mID );
            }
        }
    }
}


EffectPass.prototype.Sampler2Renderer = function (sampler)
{
    var filter = this.mRenderer.FILTER.NONE;
    if (sampler.filter === "linear") filter = this.mRenderer.FILTER.LINEAR;
    if (sampler.filter === "mipmap") filter = this.mRenderer.FILTER.MIPMAP;
    var wrap = this.mRenderer.TEXWRP.REPEAT;
    if (sampler.wrap === "clamp") wrap = this.mRenderer.TEXWRP.CLAMP;
    var vflip = false;
    if (sampler.vflip === "true") vflip = true;

    return { mFilter: filter, mWrap: wrap, mVFlip: vflip };
}


EffectPass.prototype.GetSamplerVFlip = function (id)
{
    var inp = this.mInputs[id];

    return inp.mInfo.mSampler.vflip;
}

EffectPass.prototype.SetSamplerVFlip = function (id, str) 
{
    var me = this;
    var renderer = this.mRenderer;
    var inp = this.mInputs[id];

    var filter = false;
    if (str === "true") filter = true;

    if (inp == null)
    {
    }
    else if (inp.mInfo.mType == "texture")
    {
        if (inp.loaded)
        {
            renderer.SetSamplerVFlip(inp.globject, filter, inp.image);
            inp.mInfo.mSampler.vflip = str;
        }
    }
    else if (inp.mInfo.mType == "video")
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerVFlip(inp.globject, filter, inp.image);
            inp.mInfo.mSampler.vflip = str;
        }
    }
    else if (inp.mInfo.mType == "cubemap")
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerVFlip(inp.globject, filter, inp.image);
            inp.mInfo.mSampler.vflip = str;
        }
    }
    else if (inp.mInfo.mType == "webcam")
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerVFlip(inp.globject, filter, null);
            inp.mInfo.mSampler.vflip = str;
        }
    }
}

EffectPass.prototype.GetAcceptsVFlip = function (id)
{
    var inp = this.mInputs[id];

    if (inp == null) return false;
    if (inp.mInfo.mType == "texture") return true;
    if (inp.mInfo.mType == "video")  return true;
    if (inp.mInfo.mType == "cubemap") return true;
    if (inp.mInfo.mType == "webcam")  return true;
    if (inp.mInfo.mType == "music")  return false;
    if (inp.mInfo.mType == "musicstream") return false;
    if (inp.mInfo.mType == "mic")  return false;
    if (inp.mInfo.mType == "keyboard")  return false;
    if (inp.mInfo.mType == "buffer") return false;
    return true;
}

EffectPass.prototype.GetSamplerFilter = function (id)
{
    var inp = this.mInputs[id];
    if( inp==null) return;
    return inp.mInfo.mSampler.filter;
}

EffectPass.prototype.SetSamplerFilter = function (id, str, buffers) 
{
    var me = this;
    var renderer = this.mRenderer;
    var inp = this.mInputs[id];

    var filter = renderer.FILTER.NONE;
    if (str == "linear") filter = renderer.FILTER.LINEAR;
    if (str == "mipmap") filter = renderer.FILTER.MIPMAP;

    if (inp == null)
    {
    }
    else if (inp.mInfo.mType == "texture")
    {
        if (inp.loaded)
        {
            renderer.SetSamplerFilter(inp.globject, filter);
            inp.mInfo.mSampler.filter = str;
        }
    }
    else if (inp.mInfo.mType == "video")
    {
        if ( filter == renderer.FILTER.MIPMAP ) return;
        if (inp.loaded) 
        {
            renderer.SetSamplerFilter(inp.globject, filter);
            inp.mInfo.mSampler.filter = str;
        }
    }
    else if (inp.mInfo.mType == "cubemap")
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerFilter(inp.globject, filter);
            inp.mInfo.mSampler.filter = str;
        }
    }
    else if (inp.mInfo.mType == "webcam")
    {
        if (inp.loaded) 
        {
            if ( filter == renderer.FILTER.MIPMAP ) return;
            renderer.SetSamplerFilter(inp.globject, filter);
            inp.mInfo.mSampler.filter = str;
        }
    }
    else if (inp.mInfo.mType == "buffer")
    {
        renderer.SetSamplerFilter(buffers[id].mTexture[0], filter);
        renderer.SetSamplerFilter(buffers[id].mTexture[1], filter);
        inp.mInfo.mSampler.filter = str;
    }
    else if (inp.mInfo.mType === "keyboard")
    {
        inp.mInfo.mSampler.filter = str;
    }
}

EffectPass.prototype.GetAcceptsMipmapping = function (id)
{
    var inp = this.mInputs[id];

    if (inp == null) return false;
    if (inp.mInfo.mType == "texture") return true;
    if (inp.mInfo.mType == "video")  return false;
    if (inp.mInfo.mType == "cubemap") return true;
    if (inp.mInfo.mType == "webcam")  return false;
    if (inp.mInfo.mType == "music")  return false;
    if (inp.mInfo.mType == "musicstream") return false;
    if (inp.mInfo.mType == "mic")  return false;
    if (inp.mInfo.mType == "keyboard")  return false;
    if (inp.mInfo.mType == "buffer") return false;
    return false;
}

EffectPass.prototype.GetAcceptsLinear = function (id)
{
    var inp = this.mInputs[id];

    if (inp == null) return false;
    if (inp.mInfo.mType == "texture") return true;
    if (inp.mInfo.mType == "video")  return true;
    if (inp.mInfo.mType == "cubemap") return true;
    if (inp.mInfo.mType == "webcam")  return true;
    if (inp.mInfo.mType == "music")  return true;
    if (inp.mInfo.mType == "musicstream") return true;
    if (inp.mInfo.mType == "mic")  return true;
    if (inp.mInfo.mType == "keyboard")  return false;
    if (inp.mInfo.mType == "buffer") return true;
    return false;
}


EffectPass.prototype.GetAcceptsWrapRepeat = function (id)
{
    var inp = this.mInputs[id];

    if (inp == null) return false;
    if (inp.mInfo.mType == "texture") return true;
    if (inp.mInfo.mType == "video")  return false;
    if (inp.mInfo.mType == "cubemap") return false;
    if (inp.mInfo.mType == "webcam")  return false;
    if (inp.mInfo.mType == "music")  return false;
    if (inp.mInfo.mType == "musicstream") return false;
    if (inp.mInfo.mType == "mic")  return false;
    if (inp.mInfo.mType == "keyboard")  return false;
    if (inp.mInfo.mType == "buffer") return false;
    return false;
}

EffectPass.prototype.GetSamplerWrap = function (id)
{
    var inp = this.mInputs[id];
    return inp.mInfo.mSampler.wrap;
}
EffectPass.prototype.SetSamplerWrap = function (id, str, buffers)
{
    var me = this;
    var renderer = this.mRenderer;
    var inp = this.mInputs[id];

    var restr = renderer.TEXWRP.REPEAT;
    if (str == "clamp") restr = renderer.TEXWRP.CLAMP;

    if (inp == null) 
    {
    }
    else if (inp.mInfo.mType == "texture")
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerWrap(inp.globject, restr);
            inp.mInfo.mSampler.wrap = str;
        }
    }
    else if (inp.mInfo.mType == "video") 
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerWrap(inp.globject, restr);
            inp.mInfo.mSampler.wrap = str;
        }
    }
    else if (inp.mInfo.mType == "cubemap") 
    {
        if (inp.loaded)
        {
            renderer.SetSamplerWrap(inp.globject, restr);
            inp.mInfo.mSampler.wrap = str;
        }
    }
    else if (inp.mInfo.mType == "webcam") 
    {
        if (inp.loaded) 
        {
            renderer.SetSamplerWrap(inp.globject, restr);
            inp.mInfo.mSampler.wrap = str;
        }
    }
    else if (inp.mInfo.mType == "buffer")
    {
        renderer.SetSamplerWrap(buffers[id].mTexture[0], restr);
        renderer.SetSamplerWrap(buffers[id].mTexture[1], restr);
        inp.mInfo.mSampler.wrap = str;
    }
}


EffectPass.prototype.GetTexture = function( slot )
{
    var inp = this.mInputs[slot];
    if( inp==null ) return null;
    return inp.mInfo;

}

EffectPass.prototype.SetOutputs = function( slot, id )
{
    this.mOutputs[slot] = id;
}

EffectPass.prototype.NewTexture = function( wa, slot, url, buffers, keyboard )
{
    var me = this;
    var renderer = this.mRenderer;

    if( renderer==null ) return;

    var texture = null;

    if( url==null )
    {
        if( me.mTextureCallbackFun!=null )
            me.mTextureCallbackFun( this.mTextureCallbackObj, slot, null, false, 0, 1, -1.0, me.mID );
        this.DestroyInput( slot );
        this.mInputs[slot] = null;
        return false;
    }
    else if( url.mType=="texture" )
    {
        texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = false;
        texture.image = new Image();
        texture.image.crossOrigin = '';
        texture.image.onload = function()
        {
            var rti = me.Sampler2Renderer(url.mSampler);

            var channels = renderer.TEXFMT.C4I8;
            if (url.mSrc == "/presets/tex15.png" || url.mSrc == "/presets/tex10.png" || url.mSrc == "/presets/tex12.png" || url.mSrc == "/presets/tex19.png")
                channels = renderer.TEXFMT.C1I8;
            
            texture.globject = renderer.CreateTextureFromImage(renderer.TEXTYPE.T2D, texture.image, channels, rti.mFilter, rti.mWrap, rti.mVFlip);

            texture.loaded = true;
            if( me.mTextureCallbackFun!=null )
                me.mTextureCallbackFun( me.mTextureCallbackObj, slot, texture.image, true, 1, 1, -1.0, me.mID );
        }
        texture.image.src = url.mSrc;
        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType=="cubemap" )
    {
        texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = false;
        texture.image = [ new Image(), new Image(), new Image(), new Image(), new Image(), new Image() ];

        texture.loaded = false;

        var rti = me.Sampler2Renderer(url.mSampler);

        var numLoaded = 0;
        for( var i=0; i<6; i++ )
        {
            texture.image[i].mId = i;
            texture.image[i].crossOrigin = '';
            texture.image[i].onload = function()
            {
                var id = this.mId;
                numLoaded++;
                if( numLoaded==6 )
                {
                    texture.globject = renderer.CreateTextureFromImage(renderer.TEXTYPE.CUBEMAP, texture.image, renderer.TEXFMT.C4I8, rti.mFilter, rti.mWrap, rti.mVFlip);
                    texture.loaded = true;
                    if (me.mTextureCallbackFun != null)
                        me.mTextureCallbackFun(me.mTextureCallbackObj, slot, texture.image[0], true, 2, 1, -1.0, me.mID);
                }
            }
            texture.image[i].src = url.mSrc.replace( "_0.", "_" + i + "." );
        }
        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType==="webcam" )
    {
        texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = false;

        texture.video = document.createElement('video');
    	texture.video.width = 320;
    	texture.video.height = 240;
    	texture.video.autoplay = true;
    	texture.video.loop = true;
        texture.video.stream = null;
        texture.mForceMuted = this.mForceMuted;
        texture.mImage = null;

        var rti = me.Sampler2Renderer(url.mSampler);

        var loadImageInsteadOfWebCam = function()
        {
            texture.mImage = new Image();
            texture.mImage.onload = function()
            {
                texture.loaded = true;
                texture.globject = renderer.CreateTextureFromImage(renderer.TEXTYPE.T2D, texture.mImage, renderer.TEXFMT.C4I8, rti.mFilter, rti.mWrap, rti.mVFlip);
                if( me.mTextureCallbackFun!=null )
                    me.mTextureCallbackFun( me.mTextureCallbackObj, slot, texture.mImage, true, 7, 1, -1.0, me.mID );
            }
            texture.mImage.src = "/presets/webcam.png";
        }
        
        loadImageInsteadOfWebCam();

        if( typeof navigator.getUserMedia !== "undefined"  && texture.mForceMuted===false )
        {
            texture.video.addEventListener("canplay", function (e)
            {
				try
				{
                    texture.mImage = null;
                    if( texture.globject != null )
                        renderer.DestroyTexture( texture.globject );
					texture.globject = renderer.CreateTextureFromImage(renderer.TEXTYPE.T2D, texture.video, renderer.TEXFMT.C4I8, rti.mFilter, rti.mWrap, rti.mVFlip);
					texture.loaded = true;
                }
                catch(e)
                {
                    loadImageInsteadOfWebCam();
	                alert( 'Your browser can not transfer webcam data to the GPU.');
                }
            } );

            navigator.getUserMedia( { "video": { mandatory: { minWidth: 640, maxWidth: 1280, minHeight: 480, maxHeight: 720, minFrameRate: 30 },
                                                 optional: [ { minFrameRate: 60 } ] },
                                      "audio": false },
                                function(stream)
                                {
                            		texture.video.src = window.URL.createObjectURL(stream);
                                    texture.video.stream = stream;
    	                        },
                                function(error)
                                {
                                    loadImageInsteadOfWebCam();
    		                        alert( 'Unable to capture WebCam. Please reload the page.' );
    	                        } );
        }
        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType=="mic" )
    {
        texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = false;
        texture.mForceMuted = this.mForceMuted;
        texture.mAnalyser = null;
        var num = 512;
        texture.mFreqData = new Uint8Array( num );
        texture.mWaveData = new Uint8Array( num );

        if( wa == null || typeof navigator.getUserMedia === "undefined" )
        {
            if( !texture.mForceMuted ) alert( "Shadertoy: Web Audio not implement in this browser" );
            texture.mForceMuted = true; 
        }


        if( texture.mForceMuted )
        {
            texture.globject = renderer.CreateTexture(renderer.TEXTYPE.T2D, num, 2, renderer.TEXFMT.C1I8, renderer.FILTER.LINEAR, renderer.TEXWRP.CLAMP, null)
            texture.loaded = true;
        }
        else
        {
        navigator.getUserMedia( { "audio": true },
                                function(stream)
                                {
                                  texture.globject = renderer.CreateTexture(renderer.TEXTYPE.T2D, 512, 2, renderer.TEXFMT.C1I8, renderer.FILTER.LINEAR, null)
                                  texture.mic = wa.createMediaStreamSource(stream);
                                  texture.mAnalyser = wa.createAnalyser();
                                  texture.mic.connect( texture.mAnalyser );
                                  texture.loaded = true;
    	                        },
                                function(error)
                                {
    		                        alert( 'Unable open Mic. Please reload the page.' );
    	                        } );
        }
        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType=="video" )
    {
    	texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = false;
        texture.video = document.createElement('video');
    	texture.video.loop = true;
        texture.video.mPaused = this.mForcePaused;
        texture.video.mMuted = this.mForceMuted;
    	texture.video.muted  = this.mForceMuted;
        if( this.mForceMuted==true )
            texture.video.volume = 0;
    	texture.video.autoplay = false;
        texture.video.hasFalled = false;
        
        var rti = me.Sampler2Renderer(url.mSampler);

        texture.video.addEventListener("canplay", function (e)
        {
            texture.video.play();
            texture.video.mPaused = false;

            //var rti = me.Sampler2Renderer(url.mSampler);

            texture.globject = renderer.CreateTextureFromImage(renderer.TEXTYPE.T2D, texture.video, renderer.TEXFMT.C4I8, rti.mFilter, rti.mWrap, rti.mVFlip);
            texture.loaded = true;
            
            if( me.mTextureCallbackFun!=null )
                me.mTextureCallbackFun( me.mTextureCallbackObj, slot, texture.video, true, 3, 1, -1.0, me.mID );

        } );

        texture.video.addEventListener( "error", function(e)
        {
               if( texture.video.hasFalled==true ) { alert("Error: cannot load video" ); return; }
               var str = texture.video.src;
               str = str.substr(0,str.lastIndexOf('.') ) + ".mp4";
               texture.video.src = str;
               texture.video.hasFalled = true;
        } );

        texture.video.src = url.mSrc;

        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType=="music" || url.mType=="musicstream" )
    {
    	texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = false;
        texture.audio = document.createElement('audio');
    	texture.audio.loop = true;
        texture.audio.mMuted = this.mForceMuted;
        texture.audio.mForceMuted = this.mForceMuted;
        texture.audio.muted = this.mForceMuted;
        if( this.mForceMuted==true )
            texture.audio.volume = 0;
        texture.audio.autoplay = false;
        texture.audio.hasFalled = false;
        texture.audio.mPaused = false;
        texture.audio.mSound = {};

        if( this.mForceMuted==false )
        {
            if(url.mType=="musicstream" && SC == null)
            {
                alert( "Shadertoy: Soundcloud could not be reached" );
                texture.audio.mForceMuted = true;
            }
            }

        if( wa == null && this.mForceMuted==false )
        {
            alert( "Shadertoy: Web Audio not implement in this browser" );
            texture.audio.mForceMuted = true;
        }

        if( texture.audio.mForceMuted )
        {
            texture.globject = renderer.CreateTexture(renderer.TEXTYPE.T2D, 512, 2, renderer.TEXFMT.C1I8, renderer.FILTER.LINEAR, renderer.TEXWRP.CLAMP, null);
            var num = 512;
            texture.audio.mSound.mFreqData = new Uint8Array( num );
            texture.audio.mSound.mWaveData = new Uint8Array( num );
            texture.loaded = true;
        }

        texture.audio.addEventListener( "canplay", function()
        {
            if( texture==null || texture.audio==null ) return;
            if( this.mForceMuted  ) return;
            if( texture.loaded === true ) return;

            texture.globject = renderer.CreateTexture(renderer.TEXTYPE.T2D, 512, 2, renderer.TEXFMT.C1I8, renderer.FILTER.LINEAR, renderer.TEXWRP.CLAMP, null)

            texture.audio.mSound.mSource   = wa.createMediaElementSource( texture.audio );
            texture.audio.mSound.mAnalyser = wa.createAnalyser();
            texture.audio.mSound.mGain     = wa.createGain();

            texture.audio.mSound.mSource.connect(   texture.audio.mSound.mAnalyser );
            texture.audio.mSound.mAnalyser.connect( texture.audio.mSound.mGain );
            texture.audio.mSound.mGain.connect( wa.destination );

            texture.audio.mSound.mFreqData = new Uint8Array( texture.audio.mSound.mAnalyser.frequencyBinCount );
            texture.audio.mSound.mWaveData = new Uint8Array( texture.audio.mSound.mAnalyser.frequencyBinCount );

            if( texture.audio.mPaused )
                texture.audio.pause();
            else
                texture.audio.play();
            texture.loaded = true;
        } );

        texture.audio.addEventListener( "error", function(e)
        {
               if( this.mForceMuted  ) return;

               if( texture.audio.hasFalled==true ) { /*alert("Error: cannot load music" ); */return; }
               var str = texture.audio.src;
               str = str.substr(0,str.lastIndexOf('.') ) + ".ogg";
               texture.audio.src = str;
               texture.audio.hasFalled = true;
        } );

        if( !texture.audio.mForceMuted )
        {
            if(url.mType=="musicstream")
            {
                SC.resolve(url.mSrc).then( function(song) 
                                           {
                                                if( song.streamable==true )
                                                {
                                                    texture.audio.crossOrigin = '';
                                                    texture.audio.src = song.stream_url + "?client_id=" + SC.client_id;
                                                    texture.audio.soundcloudInfo = song;
                                                }
                                                else
                                                {
                                                    alert('Shadertoy: Soundcloud - This track cannot be streamed' );
                                                }
                                            } 
                                            ).catch( 
                                            function(error)
                                            {
                                                alert('Shadertoy: Soundcloud - ' + error.message);
                                                //console.log('Shadertoy: Soundcloud - ' + error.message);
                                            } );
            } 
            else
            {
                texture.audio.src = url.mSrc;
            }
        }

        if (me.mTextureCallbackFun!=null)
        {
            if (url.mType == "music")            me.mTextureCallbackFun(me.mTextureCallbackObj, slot, {wave:null}, false, 4, 0, -1.0, me.mID);
            else if (url.mType == "musicstream") me.mTextureCallbackFun(me.mTextureCallbackObj, slot, {wave:null, info: texture.audio.soundcloudInfo}, false, 8, 0, -1.0, me.mID);
        }

        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType=="keyboard" )
    {
    	texture = {};
        texture.mInfo = url;
        texture.globject = null;
        texture.loaded = true;

        texture.keyboard = {};

        if( me.mTextureCallbackFun!=null )
            me.mTextureCallbackFun( me.mTextureCallbackObj, slot, {mImage: keyboard.mIcon, mData: keyboard.mData}, false, 6, 1, -1.0, me.mID );

/*
        //texture.keyboard.mImage = new Image();
        //texture.keyboard.mImage.onload = function()
        {
            texture.loaded = true;
            if( me.mTextureCallbackFun!=null )
                me.mTextureCallbackFun( me.mTextureCallbackObj, slot, {mImage:texture.keyboard.mImage,mData:texture.keyboard.mData}, false, 6, 1, -1.0, me.mID );
        }
        texture.keyboard.mImage.src = "/img/keyboard.png";
*/
/*
        texture.keyboard.mNewTextureReady = true;
        texture.keyboard.mData = new Uint8Array( 256*3 );
        texture.globject = renderer.CreateTexture(renderer.TEXTYPE.T2D, 256, 3, renderer.TEXFMT.C1I8, renderer.FILTER.NONE, renderer.TEXWRP.CLAMP, null);
        for( var j=0; j<(256*3); j++ )
        {
              texture.keyboard.mData[j] = 0;
        }

        if( me.mTextureCallbackFun!=null )
            me.mTextureCallbackFun( me.mTextureCallbackObj, slot, {mImage:texture.keyboard.mImage,mData:texture.keyboard.mData}, false, 6, 0, -1.0, me.mID );
*/
//iq
        this.DestroyInput( slot );
        this.mInputs[slot] = texture;
    }
    else if( url.mType=="buffer" )
    {
        texture = {};
        texture.mInfo = url;

        var bid = 0;
        if( url.mID==257 ) bid = 0; // TODO: O.M.G
        if( url.mID==258 ) bid = 1;
        if( url.mID==259 ) bid = 2;
        if( url.mID==260 ) bid = 3;

        texture.image = new Image();
        texture.image.onload = function()
        {
            if( me.mTextureCallbackFun!=null )
                me.mTextureCallbackFun( me.mTextureCallbackObj, slot, {texture: texture.image, data:null}, true, 9, 1, -1.0, me.mID );
        }
        texture.image.src = url.mSrc;
        texture.id = bid;
        texture.loaded = true;

        this.DestroyInput( slot );
        this.mInputs[slot] = texture;

        // Setting the passes samplers
        this.SetSamplerFilter(slot, url.mSampler.filter, buffers);
        this.SetSamplerVFlip(slot, url.mSampler.vflip);
        this.SetSamplerWrap(slot, url.mSampler.wrap, buffers);
    }
    else if( url.mType==null )
    {
        if( me.mTextureCallbackFun!=null )
            me.mTextureCallbackFun( this.mTextureCallbackObj, slot, null, false, 0, 0, -1.0, me.mID );
        this.DestroyInput( slot );
        this.mInputs[slot] = null;
    }
    else
    {
        alert( "input type error" );
        return;
    }

    this.MakeHeader();
}

EffectPass.prototype.Paint_Image = function( vrData, wa, d, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, buffers, keyboard )
{
    var times = [ 0.0, 0.0, 0.0, 0.0 ];

    var dates = [ d.getFullYear(), // the year (four digits)
                  d.getMonth(),	   // the month (from 0-11)
                  d.getDate(),     // the day of the month (from 1-31)
                  d.getHours()*60.0*60 + d.getMinutes()*60 + d.getSeconds()  + d.getMilliseconds()/1000.0 ];

    var mouse = [  mousePosX, mousePosY, mouseOriX, mouseOriY ];

    var resos = [ 0.0,0.0,0.0, 0.0,0.0,0.0, 0.0,0.0,0.0, 0.0,0.0,0.0 ];

    //------------------------
    
    var texID = [ null, null, null, null];

    for( var i=0; i<this.mInputs.length; i++ )
    {
        var inp = this.mInputs[i];

        if( inp==null )
        {
        }
        else if( inp.mInfo.mType=="texture" )
        {
            if( inp.loaded==true  )
            {
                texID[i] = inp.globject;
                resos[3*i+0] = inp.image.width;
                resos[3*i+1] = inp.image.height;
                resos[3*i+2] = 1;
            }
        }
        else if( inp.mInfo.mType=="keyboard" )
        {
            texID[i] = keyboard.mTexture;
        }
        else if( inp.mInfo.mType=="cubemap" )
        {
            if (inp.loaded == true)
                texID[i] = inp.globject;
        }
        else if( inp.mInfo.mType=="webcam" )
        {
            if( inp.loaded==true )
            {
                if( inp.mImage !== null )
                {
                    if( this.mTextureCallbackFun!=null )
                        this.mTextureCallbackFun( this.mTextureCallbackObj, i, inp.mImage, false, 7, 1, -1, this.mID );

                    texID[i] = inp.globject;
                    resos[3*i+0] = inp.mImage.width;
                    resos[3*i+1] = inp.mImage.height;
                    resos[3*i+2] = 1;
                }
                else  if( inp.video.readyState === inp.video.HAVE_ENOUGH_DATA )
                {

                    if( this.mTextureCallbackFun!=null )
                        this.mTextureCallbackFun( this.mTextureCallbackObj, i, inp.video, false, 7, 1, -1, this.mID );

                    texID[i] = inp.globject;
                    this.mRenderer.UpdateTextureFromImage(inp.globject, inp.video);
                    resos[3*i+0] = inp.video.videoWidth;
                    resos[3*i+1] = inp.video.videoHeight;
                    resos[3*i+2] = 1;
                }
            }
            else 
            {
                texID[i] = null;
                resos[3*i+0] = inp.video.width;
                resos[3*i+1] = inp.video.height;
                resos[3*i+2] = 1;
            }
        }
        else if( inp.mInfo.mType=="video" )
        {
            if( inp.video.mPaused == false )
            {
                if( this.mTextureCallbackFun!=null )
                    this.mTextureCallbackFun( this.mTextureCallbackObj, i, inp.video, false, 3, 1, inp.video.currentTime, this.mID );
            }

            if( inp.loaded==true )
           { 
                times[i] = inp.video.currentTime;

                texID[i] = inp.globject;

      	        if( inp.video.mPaused == false )
      	        {
      	            this.mRenderer.UpdateTextureFromImage(inp.globject, inp.video);
                }
                resos[3*i+0] = inp.video.videoWidth;
                resos[3*i+1] = inp.video.videoHeight;
                resos[3*i+2] = 1;
            }
        }
        else if( inp.mInfo.mType=="music" || inp.mInfo.mType=="musicstream" )
        {
            if( inp.audio.mPaused == false && inp.audio.mForceMuted == false && inp.loaded==true )
            {
                if( wa != null )
                {
                    inp.audio.mSound.mAnalyser.getByteFrequencyData(  inp.audio.mSound.mFreqData );
                    inp.audio.mSound.mAnalyser.getByteTimeDomainData( inp.audio.mSound.mWaveData );
                }

                if( this.mTextureCallbackFun!=null )
                {
                         if( inp.mInfo.mType=="music")       this.mTextureCallbackFun(this.mTextureCallbackObj, i, (wa == null) ? null : { wave : inp.audio.mSound.mFreqData }, false, 4, 1, inp.audio.currentTime, this.mID);
                    else if( inp.mInfo.mType=="musicstream") this.mTextureCallbackFun(this.mTextureCallbackObj, i, (wa == null) ? null : { wave : inp.audio.mSound.mFreqData, info : inp.audio.soundcloudInfo}, false, 8, 1, inp.audio.currentTime, this.mID);
                }
            }

            if( inp.loaded==true )
            {
                times[i] = inp.audio.currentTime;
                texID[i] = inp.globject;


                if( inp.audio.mForceMuted == true )
                {
                    times[i] = 10.0 + time;
                    var num = inp.audio.mSound.mFreqData.length;
                    for( var j=0; j<num; j++ )
                    {
                        var x = j / num;
                        var f =  (0.75 + 0.25*Math.sin( 10.0*j + 13.0*time )) * Math.exp( -3.0*x );

                        if( j<3 )
                            f =  Math.pow( 0.50 + 0.5*Math.sin( 6.2831*time ), 4.0 ) * (1.0-j/3.0);

                        inp.audio.mSound.mFreqData[j] = Math.floor(255.0*f) | 0;
                    }

                    var num = inp.audio.mSound.mFreqData.length;
                    for( var j=0; j<num; j++ )
                    {
                        var f = 0.5 + 0.15*Math.sin( 17.0*time + 10.0*6.2831*j/num ) * Math.sin( 23.0*time + 1.9*j/num );
                        inp.audio.mSound.mWaveData[j] = Math.floor(255.0*f) | 0;
                    }

                }

      	        if( inp.audio.mPaused == false )
                {
      	            var waveLen = Math.min(inp.audio.mSound.mWaveData.length, 512);
      	            this.mRenderer.UpdateTexture(inp.globject, 0, 0, 512, 1, inp.audio.mSound.mFreqData);
      	            this.mRenderer.UpdateTexture(inp.globject, 0, 1, 512, 1, inp.audio.mSound.mWaveData);
                }

                resos[3*i+0] = 512;
                resos[3*i+1] = 2;
                resos[3*i+2] = 1;
            }
        }
        else if( inp.mInfo.mType=="mic" )
        {
            if( inp.loaded==false || inp.mForceMuted || wa == null || inp.mAnalyser == null )
            {
                    times[i] = 10.0 + time;
                    var num = inp.mFreqData.length;
                    for( var j=0; j<num; j++ )
                    {
                        var x = j / num;
                        var f =  (0.75 + 0.25*Math.sin( 10.0*j + 13.0*time )) * Math.exp( -3.0*x );

                        if( j<3 )
                            f =  Math.pow( 0.50 + 0.5*Math.sin( 6.2831*time ), 4.0 ) * (1.0-j/3.0);

                        inp.mFreqData[j] = Math.floor(255.0*f) | 0;
                    }

                    var num = inp.mFreqData.length;
                    for( var j=0; j<num; j++ )
                    {
                        var f = 0.5 + 0.15*Math.sin( 17.0*time + 10.0*6.2831*j/num ) * Math.sin( 23.0*time + 1.9*j/num );
                        inp.mWaveData[j] = Math.floor(255.0*f) | 0;
                    }
            }
            else
            {
                inp.mAnalyser.getByteFrequencyData(  inp.mFreqData );
                inp.mAnalyser.getByteTimeDomainData( inp.mWaveData );
            }

            if( this.mTextureCallbackFun!=null )
                this.mTextureCallbackFun( this.mTextureCallbackObj, i, {wave:inp.mFreqData}, false, 5, 1, -1, this.mID );

            if( inp.loaded==true )
            {
                texID[i] = inp.globject;
                var waveLen = Math.min( inp.mWaveData.length, 512 );
                this.mRenderer.UpdateTexture(inp.globject, 0, 0, 512,     1, inp.mFreqData);
                this.mRenderer.UpdateTexture(inp.globject, 0, 1, waveLen, 1, inp.mWaveData);
                resos[3*i+0] = 512;
                resos[3*i+1] = 2;
                resos[3*i+2] = 1;
            }
        }
        else if( inp.mInfo.mType==="buffer" )
        {
            if( inp.loaded===true  )
            {
                var id = inp.id;
                texID[i] = buffers[id].mTexture[ buffers[id].mLastRenderDone ];
                resos[3*i+0] = xres;
                resos[3*i+1] = yres;
                resos[3*i+2] = 1;

                // hack. in webgl2.0 we have samplers, so we don't need this crap here
                var filter = this.mRenderer.FILTER.NONE;
                if (inp.mInfo.mSampler.filter === "linear") filter = this.mRenderer.FILTER.LINEAR;
                this.mRenderer.SetSamplerFilter( buffers[id].mTexture[0], filter);
                this.mRenderer.SetSamplerFilter( buffers[id].mTexture[1], filter);
            }

            if( this.mTextureCallbackFun!==null )
            {
                this.mTextureCallbackFun( this.mTextureCallbackObj, i, {texture:inp.image, data:buffers[id].mThumbnailBuffer}, false, 9, 1, -1, this.mID );
            }
        }
    }

    this.mRenderer.AttachTextures( 4, texID[0], texID[1], texID[2], texID[3] );

    //-----------------------------------
    //var prog = (vrData==null) ? this.mProgram : this.mProgramVR;

    var prog = this.mProgram;
    if( vrData!=null && this.mSupportsVR ) prog = this.mProgramVR;



    this.mRenderer.AttachShader(prog);

    this.mRenderer.SetShaderConstant1F(  "iGlobalTime", time);
    this.mRenderer.SetShaderConstant3F(  "iResolution", xres, yres, 1.0);
    this.mRenderer.SetShaderConstant4FV( "iMouse", mouse);
    this.mRenderer.SetShaderConstant1FV( "iChannelTime", times );              // OBSOLETE
    this.mRenderer.SetShaderConstant4FV( "iDate", dates );
    this.mRenderer.SetShaderConstant3FV( "iChannelResolution", resos );        // OBSOLETE
    this.mRenderer.SetShaderConstant1F(  "iSampleRate", this.mSampleRate);
    this.mRenderer.SetShaderTextureUnit( "iChannel0", 0 );
    this.mRenderer.SetShaderTextureUnit( "iChannel1", 1 );
    this.mRenderer.SetShaderTextureUnit( "iChannel2", 2 );
    this.mRenderer.SetShaderTextureUnit( "iChannel3", 3 );
    this.mRenderer.SetShaderConstant1I(  "iFrame", this.mFrame );
    this.mRenderer.SetShaderConstant1F(  "iTimeDelta", dtime);
    this.mRenderer.SetShaderConstant1F(  "iFrameRate", fps );

    this.mRenderer.SetShaderConstant1F(  "iChannel[0].time",       times[0] );
    this.mRenderer.SetShaderConstant1F(  "iChannel[1].time",       times[1] );
    this.mRenderer.SetShaderConstant1F(  "iChannel[2].time",       times[2] );
    this.mRenderer.SetShaderConstant1F(  "iChannel[3].time",       times[3] );
    this.mRenderer.SetShaderConstant3F(  "iChannel[0].resolution", resos[0], resos[ 1], resos[ 2] );
    this.mRenderer.SetShaderConstant3F(  "iChannel[1].resolution", resos[3], resos[ 4], resos[ 5] );
    this.mRenderer.SetShaderConstant3F(  "iChannel[2].resolution", resos[6], resos[ 7], resos[ 8] );
    this.mRenderer.SetShaderConstant3F(  "iChannel[3].resolution", resos[9], resos[10], resos[11] );

    var l1 = this.mRenderer.GetAttribLocation(this.mProgram, "pos");


    if( (vrData != null) && this.mSupportsVR )
    {
        for( var i=0; i<2; i++ )
        {
            var ei = (i==0) ? vrData.mLeftEye : vrData.mRightEye;

            var vp = [i * xres / 2, 0, xres / 2, yres];

            this.mRenderer.SetViewport(vp);

            var fov = ei.mProjection;
            var corA = [ -fov[2], -fov[1], -1.0 ];
            var corB = [  fov[3], -fov[1], -1.0 ];
            var corC = [  fov[3],  fov[0], -1.0 ];
            var corD = [ -fov[2],  fov[0], -1.0 ];
            var apex = [ 0.0, 0.0, 0.0 ];

            var ma = invertFast( ei.mCamera );
            corA = matMulpoint( ma, corA ); 
            corB = matMulpoint( ma, corB ); 
            corC = matMulpoint( ma, corC ); 
            corD = matMulpoint( ma, corD ); 
            apex = matMulpoint( ma, apex ); 

            var corners = [ corA[0], corA[1], corA[2], 
                            corB[0], corB[1], corB[2], 
                            corC[0], corC[1], corC[2], 
                            corD[0], corD[1], corD[2],
                            apex[0], apex[1], apex[2]];

            this.mRenderer.SetShaderConstant3FV("unCorners", corners);
            this.mRenderer.SetShaderConstant4FV("unViewport", vp);

            this.mRenderer.DrawUnitQuad_XY(l1);
        }
    }
    else 
    {
        this.mRenderer.SetViewport([0, 0, xres, yres]);
        this.mRenderer.DrawFullScreenTriangle_XY( l1 );
    }

    this.mRenderer.DettachTextures();
}

EffectPass.prototype.Paint_Sound = function( wa, d )
{
    var dates = [ d.getFullYear(), // the year (four digits)
                  d.getMonth(),	   // the month (from 0-11)
                  d.getDate(),     // the day of the month (from 1-31)
                  d.getHours()*60.0*60 + d.getMinutes()*60 + d.getSeconds() ];

    var resos = [ 0.0,0.0,0.0, 0.0,0.0,0.0, 0.0,0.0,0.0, 0.0,0.0,0.0 ];

    this.mRenderer.SetRenderTarget(this.mRenderFBO);
    this.mRenderer.SetViewport([0, 0, this.mTextureDimensions, this.mTextureDimensions]);
    this.mRenderer.AttachShader(this.mProgram);
    this.mRenderer.SetBlend( false );
    var texID = [null, null, null, null];
    for (var i = 0; i < this.mInputs.length; i++)
    {
        var inp = this.mInputs[i];

        if( inp==null )
        {
        }
        else if( inp.mInfo.mType=="texture" )
        {
            if( inp.loaded==true  )
            {
                texID[i] = inp.globject;
                resos[3*i+0] = inp.image.width;
                resos[3*i+1] = inp.image.height;
                resos[3*i+2] = 1;
            }
        }
    }

    this.mRenderer.AttachTextures(4, texID[0], texID[1], texID[2], texID[3]);

    var l2 = this.mRenderer.SetShaderConstantLocation(this.mProgram, "iBlockOffset");
    this.mRenderer.SetShaderConstant4FV("iDate", dates);
    this.mRenderer.SetShaderConstant3FV("iChannelResolution", resos);
    this.mRenderer.SetShaderConstant1F("iSampleRate", this.mSampleRate);
    this.mRenderer.SetShaderTextureUnit("iChannel0", 0);
    this.mRenderer.SetShaderTextureUnit("iChannel1", 1);
    this.mRenderer.SetShaderTextureUnit("iChannel2", 2);
    this.mRenderer.SetShaderTextureUnit("iChannel3", 3);

    var l1 = this.mRenderer.GetAttribLocation(this.mProgram, "pos");

    //--------------------------------
    var numSamples = this.mTmpBufferSamples;
    var bufL = this.mBuffer.getChannelData(0); // Float32Array
    var bufR = this.mBuffer.getChannelData(1); // Float32Array
    var numBlocks = this.mPlaySamples / numSamples;
    for( var j=0; j<numBlocks; j++ )
    {
        var off = j*this.mTmpBufferSamples;
        
        this.mRenderer.SetShaderConstant1F_Pos(l2, off / this.mSampleRate);
        this.mRenderer.DrawUnitQuad_XY(l1);
        this.mRenderer.GetPixelData(this.mData, this.mTextureDimensions, this.mTextureDimensions);

        for( var i=0; i<numSamples; i++ )
        {
            bufL[off+i] = -1.0 + 2.0*(this.mData[4*i+0]+256.0*this.mData[4*i+1])/65535.0;
            bufR[off+i] = -1.0 + 2.0*(this.mData[4*i+2]+256.0*this.mData[4*i+3])/65535.0;
        }
    }

    this.mRenderer.DetachShader();
    this.mRenderer.DettachTextures();
    this.mRenderer.SetRenderTarget(null);

    //-------------------------------

    if( this.mPlayNode!=null ) { this.mPlayNode.disconnect(); this.mPlayNode.stop(); }

    this.mPlayNode = wa.createBufferSource();
    this.mPlayNode.buffer = this.mBuffer;
    this.mPlayNode.connect( this.mGainNode );
    this.mPlayNode.state = this.mPlayNode.noteOn;
    this.mPlayNode.start(0);
}

EffectPass.prototype.Paint = function( vrData, wa, da, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, isPaused, bufferID, buffers, keyboard )
{
    if( this.mType==="sound" )
    {
         if( this.mFrame==0 && !isPaused )
         {
            // make sure all textures are loaded
             for( var i=0; i<this.mInputs.length; i++ )
             {
                var inp = this.mInputs[i];
                if (inp == null) continue;

                if (inp.mInfo.mType == "texture" && !inp.loaded) return;
                if (inp.mInfo.mType == "cubemap" && !inp.loaded) return;
            }

            this.Paint_Sound(wa, da);
            this.mFrame++;
        }
    }
    else if( this.mType==="image" )
    {
        this.mRenderer.SetRenderTarget( null );
        this.Paint_Image( vrData, wa, da, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, buffers, keyboard );
        this.mFrame++;
    }
    else // if( this.mType=="buffer" )
    {
        var buffer = buffers[bufferID];

        var dstID = 1 - buffer.mLastRenderDone;

        this.mRenderer.SetRenderTarget( buffer.mTarget[dstID] );
        this.Paint_Image( vrData, wa, da, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, buffers, keyboard );

        // make thumbnail
        //if( this.mTextureCallbackFun != null )
        /*
        {
            this.mRenderer.SetRenderTarget( buffer.mThumbnailRenderTarget );
            var v = [0, 0, buffer.mThumbnailRes[0], buffer.mThumbnailRes[1]];
            this.mRenderer.SetBlend(false);
            this.mRenderer.SetViewport(v);
            this.mRenderer.AttachShader(this.mProgramCopy);
            var l1 = this.mRenderer.GetAttribLocation(this.mProgramCopy, "pos");
            this.mRenderer.SetShaderConstant4FV("v", v);
            this.mRenderer.AttachTextures(1, buffer.mTexture[dstID], null, null, null);
            this.mRenderer.DrawUnitQuad_XY(l1);
            this.mRenderer.DettachTextures();
            this.mRenderer.DetachShader();
            this.mRenderer.GetPixelData( new Uint8Array(buffer.mThumbnailBuffer.data.buffer), buffer.mThumbnailRes[0], buffer.mThumbnailRes[1] );
            this.mRenderer.SetRenderTarget(null);
        }
        */
        buffers[bufferID].mLastRenderDone = 1 - buffers[bufferID].mLastRenderDone;
        this.mFrame++;
    }

}

EffectPass.prototype.StopOutput_Sound = function( wa )
{
    if( this.mPlayNode===null ) return;
    this.mPlayNode.disconnect();

};

EffectPass.prototype.ResumeOutput_Sound = function( wa )
{
    if( this.mPlayNode===null ) return;
    this.mPlayNode.connect( this.mGainNode );
};

EffectPass.prototype.StopOutput_Image = function( wa )
{
};

EffectPass.prototype.ResumeOutput_Image = function( wa )
{
};

EffectPass.prototype.StopOutput = function( wa )
{
    for( var j=0; j<this.mInputs.length; j++ )
        this.StopInput(j);

    if( this.mType=="sound" )
         this.StopOutput_Sound( wa );
    else
         this.StopOutput_Image( wa );
}


EffectPass.prototype.ResumeOutput = function( wa )
{
    for( var j=0; j<this.mInputs.length; j++ )
        this.ResumeInput(j);

    if( this.mType=="sound" )
         this.ResumeOutput_Sound( wa );
    else
         this.ResumeOutput_Image( wa );
}

//============================================================================================================

function Effect( vr, ac, gl, xres, yres, callback, obj, forceMuted, forcePaused )
{
    this.mRenderer = null;
    this.mAudioContext = ac;
    this.mGLContext = gl;
    this.mWebVR = vr;
    this.mRenderingStereo = false;
    this.mXres = xres;
    this.mYres = yres;
    this.mForceMuted = forceMuted;
    if( ac==null ) this.mForceMuted = true;
    this.mForcePaused = forcePaused;
    this.mGainNode = null;
    this.mPasses = [];
    this.mFrame = 0;
    this.mTextureCallbackFun = callback;
    this.mTextureCallbackObj = obj;
    this.mMaxBuffers = 4;
    this.mMaxPasses = this.mMaxBuffers + 1 + 1;  // some day decouple passes from buffers
    this.mBuffers = [];

    //-------------
    if (gl == null) 
        return;

    this.mRenderer = piRenderer();

    if (!this.mRenderer.Initialize(gl))
        return;

    var caps = this.mRenderer.GetCaps();
    this.mSupportsDerivatives = caps.mDerivatives;
    this.mSupportsTextureLOD = caps.mShaderTextureLOD;
    
    this.mSupportTextureFloat = caps.mFloat32Textures;
    this.mPrecision = this.mRenderer.GetPrecisionString();

    //-------------
    if( ac!=null )
    {   
        this.mGainNode = ac.createGain();
        this.mGainNode.connect( ac.destination);
        this.mGainNode.gain.value = (this.mForceMuted)?0.0:1.0;
    }

    //-------------
    var vsSourceC = "attribute vec2 pos; void main() { gl_Position = vec4(pos.xy,0.0,1.0); }";
    var fsSourceC = this.mPrecision + "uniform vec4 v; uniform sampler2D t; void main() { gl_FragColor = texture2D(t, gl_FragCoord.xy / v.zw, -100.0); }";
    var res = this.mRenderer.CreateShader(vsSourceC, fsSourceC);
    if (res.mResult == false)
    {
        console.log("Failed to compile shader to copy buffers : " + res);
        return;
    }
    this.mProgramCopy = res;

    var vsSourceD = "attribute vec2 pos; void main() { gl_Position = vec4(pos.xy,0.0,1.0); }";
    var fsSourceD = this.mPrecision + "uniform vec4 v; uniform sampler2D t; void main() { vec2 uv = gl_FragCoord.xy / v.zw; gl_FragColor = texture2D(t, vec2(uv.x,1.0-uv.y)); }";
    var res = this.mRenderer.CreateShader(vsSourceD, fsSourceD);
    if (res.mResult == false)
    {
        console.log("Failed to compile shader to downscale buffers : " + res);
        return;
    }
    this.mProgramDownscale = res;

    this.ResizeBuffers(null, null);


    //-------

    var keyboardData = new Uint8Array( 256*3 );
    for( var j=0; j<(256*3); j++ ) { keyboardData[j] = 0; }
    var kayboardTexture = this.mRenderer.CreateTexture( this.mRenderer.TEXTYPE.T2D, 256, 3, this.mRenderer.TEXFMT.C1I8, this.mRenderer.FILTER.NONE, this.mRenderer.TEXWRP.CLAMP, null);
    var keyboardImage = new Image();
    keyboardImage.src = "/img/keyboard.png";
    this.mKeyboard = { mData: keyboardData, mTexture: kayboardTexture, mIcon: keyboardImage };


    //-------------
    //for( var i=0; i<this.mMaxPasses; i++ )
    //{
//        this.mPasses[i] = new EffectPass( this.mRenderer, precision, supportsDerivatives, supportsTextureLOD, callback, obj, forceMuted, forcePaused, this.mGainNode, i );
    //}
}

Effect.prototype.ResizeBuffers = function(oldXres, oldYres)
{
    var needCopy =  (oldXres != null && oldYres != null);

    // first time!
    if( !needCopy  )
    {
        var thumnailRes = [256, 128];

        for( var i=0; i<this.mMaxBuffers; i++ )
        {
            /*
            var thumbnailTexture = this.mRenderer.CreateTexture(this.mRenderer.TEXTYPE.T2D,
                                                    thumnailRes[0], thumnailRes[1],
                                                    this.mRenderer.TEXFMT.C4I8,
                                                    this.mRenderer.FILTER.LINEAR,
                                                    this.mRenderer.TEXWRP.CLAMP, null);

             //var thumbnailBuffer = new Uint8Array( thumnailRes[0]*thumnailRes[1]*4 );
            var thumbnailBuffer = new ImageData(thumnailRes[0],thumnailRes[1]);

             var thumbnailRenderTarget = this.mRenderer.CreateRenderTarget( thumbnailTexture, null, null, null, null, false);
            */
            this.mBuffers[i] = { mTexture: [null, null], 
                                 mTarget:  [null, null], 
                                 mLastRenderDone: 0,
                                 mThumbnailRenderTarget: null,//thumbnailRenderTarget,
                                 mThumbnailTexture: null,//thumbnailTexture,
                                 mThumbnailBuffer:  null,//thumbnailBuffer,
                                 mThumbnailRes: thumnailRes };
        }
    }

    // Prepare for rendering
    if( needCopy )
    {
        var v = [0, 0, Math.min(this.mXres, oldXres), Math.min(this.mYres, oldYres)];
        this.mRenderer.SetBlend(false);
        this.mRenderer.SetViewport(v);
        this.mRenderer.AttachShader(this.mProgramCopy);
        var l1 = this.mRenderer.GetAttribLocation(this.mProgramCopy, "pos");
        var vOld = [0, 0, oldXres, oldYres];
        this.mRenderer.SetShaderConstant4FV("v", vOld);
    }

    // Resize each double buffer
    for( var i=0; i<this.mMaxBuffers; i++ )
    {
        var texture1 = this.mRenderer.CreateTexture(this.mRenderer.TEXTYPE.T2D,
            this.mXres, this.mYres,
            this.mRenderer.TEXFMT.C4F16,
            this.mRenderer.FILTER.LINEAR,
            this.mRenderer.TEXWRP.CLAMP, null);
        var target1 = this.mRenderer.CreateRenderTarget( texture1, null, null, null, null, false);

        var texture2 = this.mRenderer.CreateTexture(this.mRenderer.TEXTYPE.T2D,
            this.mXres, this.mYres,
            this.mRenderer.TEXFMT.C4F16,
            this.mRenderer.FILTER.LINEAR,
            this.mRenderer.TEXWRP.CLAMP, null);
        var target2 = this.mRenderer.CreateRenderTarget( texture2, null, null, null, null, false);

        if (needCopy)
        {
            // Copy old buffers 1 to new buffer
            this.mRenderer.SetRenderTarget(target1);
            this.mRenderer.AttachTextures(1, this.mBuffers[i].mTexture[0], null, null, null);
            this.mRenderer.DrawUnitQuad_XY(l1);

            // Copy old buffers 2 to new buffer
            this.mRenderer.SetRenderTarget(target2);
            this.mRenderer.AttachTextures(1, this.mBuffers[i].mTexture[1], null, null, null);
            this.mRenderer.DrawUnitQuad_XY(l1);

            // Deallocate old memory
            this.mRenderer.DestroyTexture(this.mBuffers[i].mTexture[0]);
            this.mRenderer.DestroyRenderTarget(this.mBuffers[i].mTarget[0]);
            this.mRenderer.DestroyTexture(this.mBuffers[i].mTexture[1]);
            this.mRenderer.DestroyRenderTarget(this.mBuffers[i].mTarget[1]);
            //this.mRenderer.DestroyTexture(this.mBuffers[i].thumbnailTexture);
        }

        // Store new buffers
        this.mBuffers[i].mTexture = [texture1,texture2], 
        this.mBuffers[i].mTarget =  [target1, target2 ], 
        this.mBuffers[i].mLastRenderDone = 0;
    }

    if (needCopy)
    {
        this.mRenderer.DettachTextures();
        this.mRenderer.DetachShader();
        this.mRenderer.SetRenderTarget(null);
    }

}

Effect.prototype.IsEnabledVR = function () {
    if (this.mRenderingStereo) return true;
    return false;
}

Effect.prototype.EnableVR = function(  )
{
    if( !this.mWebVR.IsSupported() ) return;
    if( this.mRenderingStereo ) return;

    this.mRenderingStereo = true;
    this.mWebVR.Enable();
}

Effect.prototype.DisableVR = function(  )
{
    if( !this.mWebVR.IsSupported() ) return;
    if( !this.mRenderingStereo ) return;

    this.mRenderingStereo = false;
    this.mWebVR.Disable();
}

Effect.prototype.GetTexture = function( passid, slot )
{
    return this.mPasses[passid].GetTexture( slot );
}

Effect.prototype.NewTexture = function( passid, slot, url )
{
    this.mPasses[passid].NewTexture( this.mAudioContext, slot, url, this.mBuffers, this.mKeyboard );
}


Effect.prototype.SetOutputs = function( passid, slot, url )
{
    this.mPasses[passid].SetOutputs( slot, url );
}



Effect.prototype.GetAcceptsLinear = function (passid, slot) 
{
    return this.mPasses[passid].GetAcceptsLinear(slot);
}

Effect.prototype.GetAcceptsMipmapping = function (passid, slot) 
{
    return this.mPasses[passid].GetAcceptsMipmapping(slot);
}

Effect.prototype.GetAcceptsWrapRepeat = function (passid, slot) 
{
    return this.mPasses[passid].GetAcceptsWrapRepeat(slot);
}

Effect.prototype.GetAcceptsVFlip = function (passid, slot)
{
    return this.mPasses[passid].GetAcceptsVFlip(slot);
}

Effect.prototype.SetSamplerFilter = function (passid, slot, str) 
{
    this.mPasses[passid].SetSamplerFilter(slot, str, this.mBuffers);
}

Effect.prototype.GetSamplerFilter = function (passid, slot) {
    return this.mPasses[passid].GetSamplerFilter(slot);
}

Effect.prototype.SetSamplerWrap = function (passid, slot, str) {
    this.mPasses[passid].SetSamplerWrap(slot, str, this.mBuffers);
}

Effect.prototype.GetSamplerWrap = function (passid, slot) {
    return this.mPasses[passid].GetSamplerWrap(slot);
}

Effect.prototype.SetSamplerVFlip = function (passid, slot, str) {
    this.mPasses[passid].SetSamplerVFlip(slot, str);
}

Effect.prototype.GetSamplerVFlip = function (passid, slot) {
    return this.mPasses[passid].GetSamplerVFlip(slot);
}



Effect.prototype.GetHeaderSize = function (passid)
{
    return this.mPasses[passid].mHeaderLength;
}

Effect.prototype.ToggleVolume = function( passid )
{
    this.mForceMuted = !this.mForceMuted;

    if( this.mForceMuted )
        this.mGainNode.disconnect();
    else
        this.mGainNode.connect( this.mAudioContext.destination );

    return this.mForceMuted;
}


Effect.prototype.SetKeyDown = function( passid, k )
{
    this.mKeyboard.mData[ k + 0*256 ] = 255;
    this.mKeyboard.mData[ k + 1*256 ] = 255;
    this.mKeyboard.mData[ k + 2*256 ] = 255 - this.mKeyboard.mData[ k + 2*256 ];
    this.mRenderer.UpdateTexture( this.mKeyboard.mTexture, 0, 0, 256, 3, this.mKeyboard.mData );

    var num = this.mPasses.length;
    for( var j=0; j<num; j++ )
    {
        for( var i=0; i<this.mPasses[j].mInputs.length; i++ )
        {
            var inp = this.mPasses[j].mInputs[i];
            if( inp!=null && inp.mInfo.mType=="keyboard" )
            {
                if( this.mTextureCallbackFun!=null )
                    this.mTextureCallbackFun( this.mTextureCallbackObj, i, {mImage:this.mKeyboard.mIcon, mData: this.mKeyboard.mData}, false, 6, 1, -1.0, this.mPasses[j].mID );
            }
        }
    }
}

Effect.prototype.SetKeyUp = function( passid, k )
{
    this.mKeyboard.mData[ k + 0*256 ] = 0;
    this.mKeyboard.mData[ k + 1*256 ] = 0;
    this.mRenderer.UpdateTexture( this.mKeyboard.mTexture, 0, 0, 256, 3, this.mKeyboard.mData );

    var num = this.mPasses.length;
    for( var j=0; j<num; j++ )
    {
        for( var i=0; i<this.mPasses[j].mInputs.length; i++ )
        {
            var inp = this.mPasses[j].mInputs[i];
            if( inp!=null && inp.mInfo.mType=="keyboard" )
            {
                if( this.mTextureCallbackFun!=null )
                    this.mTextureCallbackFun( this.mTextureCallbackObj, i, {mImage:this.mKeyboard.mIcon, mData: this.mKeyboard.mData}, false, 6, 1, -1.0, this.mPasses[j].mID );
            }
        }
    }

}

Effect.prototype.StopOutputs = function()
{
    var wa = this.mAudioContext;

    var num = this.mPasses.length;
    for( var i=0; i<num; i++ )
    {
        this.mPasses[i].StopOutput( wa );
    }
}

Effect.prototype.ResumeOutputs = function()
{
    var wa = this.mAudioContext;

    var num = this.mPasses.length;
    for( var i=0; i<num; i++ )
    {
        this.mPasses[i].ResumeOutput( wa );
    }
}


Effect.prototype.SetSize = function(xres,yres)
{
    if( xres !== this.mXres || yres !== this.mYres )
    {
        var oldXres = this.mXres;
        var oldYres = this.mYres;
        this.mXres = xres;
        this.mYres = yres;
        this.ResizeBuffers(oldXres, oldYres);
    }
}

Effect.prototype.PauseInput = function( passid, id )
{
    return this.mPasses[passid].TooglePauseInput( id );
}

Effect.prototype.MuteInput = function( passid, id )
{
    return this.mPasses[passid].MuteInput( this.mAudioContext, id );
}

Effect.prototype.RewindInput = function( passid, id )
{
    this.mPasses[passid].RewindInput( id );
}

Effect.prototype.UpdateInputs = function( passid, forceUpdate )
{
   this.mPasses[passid].UpdateInputs( this.mAudioContext, forceUpdate, this.mKeyboard );
}

Effect.prototype.ResetTime = function()
{
    this.mFrame = 0;

    var num = this.mPasses.length;
    for( var i=0; i<num; i++ )
    {
        this.mPasses[i].mFrame = 0;
        for( var j=0; j<this.mPasses[i].mInputs.length; j++ )
            this.mPasses[i].RewindInput( j )
    }
}

Effect.prototype.RequestAnimationFrame = function (id)
{
    if (this.mRenderingStereo) 
        this.mWebVR.RequestAnimationFrame(id);
    else 
        requestAnimFrame(id);
}

Effect.prototype.Paint = function(time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, isPaused)
{
    var wa = this.mAudioContext;

    var da = new Date();

    var vrData = null;
    if (this.mRenderingStereo) vrData = this.mWebVR.GetData();

    var xres = this.mXres / 1;
    var yres = this.mYres / 1;

    var num = this.mPasses.length;

    if( this.mFrame==0 )
    {
        for( var i=0; i<this.mMaxBuffers; i++ )
        {
             this.mRenderer.SetRenderTarget( this.mBuffers[i].mTarget[0] );
             this.mRenderer.Clear( this.mRenderer.CLEAR.Color, [0.0,0.0,0.0,0.0], 1.0, 0   );
             this.mRenderer.SetRenderTarget( this.mBuffers[i].mTarget[1] );
             this.mRenderer.Clear( this.mRenderer.CLEAR.Color, [0.0,0.0,0.0,0.0], 1.0, 0   );
        }
    }


    // render sound first
    for( var i=0; i<num; i++ )
    {
        if( this.mPasses[i].mType != "sound" ) continue;
        if( this.mPasses[i].mProgram==null ) continue;
        this.mPasses[i].Paint( vrData, wa, da, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, isPaused, null, this.mBuffers, this.mKeyboard );
    }

    // render buffers second
    for( var i=0; i<num; i++ )
    {
        if( this.mPasses[i].mType != "buffer" ) continue;
        if( this.mPasses[i].mProgram==null ) continue;
        var bufferID = this.mPasses[i].mOutputs[0];
        this.mPasses[i].Paint( vrData, wa, da, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, isPaused, bufferID, this.mBuffers, this.mKeyboard );
    }

    // render image last
    for( var i=0; i<num; i++ )
    {
        if( this.mPasses[i].mType != "image" ) continue;
        if( this.mPasses[i].mProgram==null ) continue;
        this.mPasses[i].Paint( vrData, wa, da, time, dtime, fps, mouseOriX, mouseOriY, mousePosX, mousePosY, xres, yres, isPaused, null, this.mBuffers, this.mKeyboard );
    }   

    // erase keypresses
    for( var k=0; k<256; k++ )
    {
       this.mKeyboard.mData[ k + 1*256 ] = 0;
    }
    this.mRenderer.UpdateTexture( this.mKeyboard.mTexture, 0, 0, 256, 3, this.mKeyboard.mData );

    if( this.mRenderingStereo ) this.mWebVR.Finish();

    this.mFrame++;
}

Effect.prototype.NewShader = function( shaderCode, passid )
{
    return this.mPasses[passid].NewShader( shaderCode );
}

Effect.prototype.GetNumPasses = function()
{
    return this.mPasses.length;
}

Effect.prototype.GetNumOfType = function(passtype)
{
    var id = 0;
    for( var j=0; j<this.mPasses.length; j++ )
    {
        if( this.mPasses[j].mType===passtype )
        {
            id++;
        }
    }
    return id;
}

Effect.prototype.GetPassType = function( id )
{
    return this.mPasses[id].mType;
}
Effect.prototype.GetPassName = function( id )
{
    return this.mPasses[id].mName;
}


Effect.prototype.newScriptJSON = function( jobj )
{
    if( jobj.ver != "0.1" )
    {
        return { mFailed : true };
    }

    var numPasses = jobj.renderpass.length;

    if( numPasses<1 || numPasses>this.mMaxPasses )
    {
        return { mFailed : true, mError : "Incorrect number of passes, wrong shader format", mShader:null };
    }

    var newBufferID = 0;

    var res = [];
    res.mFailed = false;
    for( var j=0; j<numPasses; j++ )
    {
        this.mPasses[j] = new EffectPass( this.mRenderer, this.mPrecision, this.mSupportsDerivatives, this.mSupportsTextureLOD, 
                                          this.mTextureCallbackFun, this.mTextureCallbackObj, this.mForceMuted, this.mForcePaused, this.mGainNode, 
                                          this.mProgramDownscale, j );

        var rpass = jobj.renderpass[j];

        // skip sound passes if in thumbnail mode
        if( this.mForceMuted && rpass.type=="sound" ) continue;

        var numInputs = rpass.inputs.length;

        for( var i=0; i<4; i++ )
        {
              this.mPasses[j].NewTexture( this.mAudioContext, i, null, null, null );
        }
        for( var i = 0; i<numInputs; i++ )
        {
            var lid  = rpass.inputs[i].channel;
            var styp = rpass.inputs[i].ctype;
            var sid  = rpass.inputs[i].id;
            var ssrc = rpass.inputs[i].src;
            var samp = rpass.inputs[i].sampler;
            this.mPasses[j].NewTexture(this.mAudioContext, lid, { mType: styp, mID: sid, mSrc: ssrc, mSampler: samp }, this.mBuffers, this.mKeyboard );
        }

        for( var i=0; i<4; i++ )
        {
              this.mPasses[j].SetOutputs( i, null );
        }

        // this should come from the DB when we implement Multipass 2.0. But for now, we hardcode it
        var numOutputs = rpass.outputs.length;

        for( var i = 0; i<numOutputs; i++ )
        {
            var outputID = rpass.outputs[i].id;
            var outputCH = rpass.outputs[i].channel;

            if( outputID===-1 ) { outputID = 257 + newBufferID; newBufferID++; outputCH = 0; } // MEGAHACK FOR BACKWARDS COMPATIBILITY (remove)

            if( outputID>=257 && outputID<=260 ) outputID -= 257; // FIX

            this.mPasses[j].SetOutputs( outputCH, outputID );
        }

        // create some hardcoded names. This should come from the DB
        var rpassName = "";
        if( rpass.type=="sound" )  rpassName = "Sound";
        if( rpass.type=="image" )  rpassName = "Image";
        if( rpass.type=="buffer" ) rpassName = "Buf " + String.fromCharCode(65+this.mPasses[j].mOutputs[0]);

        //------------------------
        this.mPasses[j].Create( rpass.type, rpassName, this.mAudioContext );

        var shaderStr = rpass.code;

        var result = this.mPasses[j].NewShader( shaderStr );

        if( result!=null )
        {
            res.mFailed = true;
            res[j] = { mFailed      : true,
                       mError       : result,
                       //mType        : rpass.type,
                       mShader      : shaderStr };
        }
        else
        {
            res[j] = { mFailed      : false,
                       mError       : null,
                       //mType        : rpass.type,
                       mShader      : shaderStr };
        }
    }

    return res;
}

Effect.prototype.DestroyPass = function( id )
{
   this.mPasses[id].Destroy( this.mAudioContext );
   this.mPasses.splice(id, 1);
}

Effect.prototype.AddPass = function( passType, passName )
{
    var shaderStr = null;

    if( passType=="sound" )  shaderStr = "vec2 mainSound( float time )\n{\n    return vec2( sin(6.2831*440.0*time)*exp(-3.0*time) );\n}";
    if( passType=="buffer" ) shaderStr = "void mainImage( out vec4 fragColor, in vec2 fragCoord )\n{\n    fragColor = vec4(0.0,0.0,1.0,1.0);\n}";

    var id = this.GetNumPasses();
    this.mPasses[id] = new EffectPass( this.mRenderer, this.mPrecision, this.mSupportsDerivatives, this.mSupportsTextureLOD, 
                                       this.mTextureCallbackFun, this.mTextureCallbackObj, this.mForceMuted, this.mForcePaused, this.mGainNode, 
                                       this.mProgramDownscale, id );

    this.mPasses[id].Create( passType, passName, this.mAudioContext );
    var res = this.mPasses[id].NewShader( shaderStr );

    return { mId : id, mShader : shaderStr, mError : res };
}

// this should be removed once we have MultiPass 2.0 and passes render to arbitrary buffers
Effect.prototype.IsBufferPassUsed = function( bufferID )
{
    for( var j=0; j<this.mPasses.length; j++ )
    {
        if(  this.mPasses[j].mType !== "buffer" ) continue;
        if(  this.mPasses[j].mOutputs[0] === bufferID ) return true;
    }
    return false;
}

Effect.prototype.exportToJSON = function()
{
    var result = {};

    result.ver = "0.1";

    result.renderpass = [];

    var numPasses = this.mPasses.length;
    for( var j=0; j<numPasses; j++ )
    {
        result.renderpass[j] = {};

        result.renderpass[j].outputs = new Array();
        for( var i = 0; i<4; i++ )
        {
            var outputID = this.mPasses[j].mOutputs[i];

            if( outputID==null ) continue;
            if( this.mPasses[j].mType==="buffer" ) outputID += 257; // FIX
            result.renderpass[j].outputs.push( { channel: i, id: outputID } );
        }

        result.renderpass[j].inputs = new Array();
        for( var i = 0; i<4; i++ )
        {
            if( this.mPasses[j].mInputs[i]==null ) continue;
            result.renderpass[j].inputs.push( {channel: i,
                                               ctype  : this.mPasses[j].mInputs[i].mInfo.mType,
                                               id     : this.mPasses[j].mInputs[i].mInfo.mID,
                                               src    : this.mPasses[j].mInputs[i].mInfo.mSrc,
                                               sampler: this.mPasses[j].mInputs[i].mInfo.mSampler });
        }

        result.renderpass[j].code = this.mPasses[j].mSource;
        result.renderpass[j].name = this.mPasses[j].mName
        result.renderpass[j].description = "";
        result.renderpass[j].type = this.mPasses[j].mType;
    }

    result.flags = this.calcFlags();

    return result;
}

Effect.prototype.calcFlags = function()
{
    var flagVR = false;
    var flagWebcam = false;
    var flagSoundInput = false;
    var flagSoundOutput = false;
    var flagKeyboard = false;
    var flagMultipass = false;
    var flagMusicStream = false;

    var numPasses = this.mPasses.length;
    for( var j=0; j<numPasses; j++ )
    {
        var pass = this.mPasses[j];

        if( pass.mType=="sound" ) flagSoundOutput = true;
        if( pass.mType=="buffer" ) flagMultipass = true;

        for( var i = 0; i<4; i++ )
        {
            if( pass.mInputs[i]==null ) continue;

                 if( pass.mInputs[i].mInfo.mType=="webcam" )      flagWebcam = true;
            else if( pass.mInputs[i].mInfo.mType=="keyboard" )    flagKeyboard = true;
            else if( pass.mInputs[i].mInfo.mType=="mic" )         flagSoundInput = true;
            else if( pass.mInputs[i].mInfo.mType=="musicstream" ) flagMusicStream = true;
        }

        var n1 = pass.mSource.indexOf("mainVR(");
        var n2 = pass.mSource.indexOf("mainVR (");
        if( n1>0 || n2>0 ) flagVR = true;
    }

    return { mFlagVR          : flagVR,
             mFlagWebcam      : flagWebcam,
             mFlagSoundInput  : flagSoundInput,
             mFlagSoundOutput : flagSoundOutput,
             mFlagKeyboard    : flagKeyboard,
             mFlagMultipass   : flagMultipass,
             mFlagMusicStream : flagMusicStream };
}
package prime.wwx2013;
 import js.JQuery;
 import tryhaxe.Editor;
  using js.bootstrap.Button;
  using Std;


class PrimeEditor
{
#if haxe3   private static var editors : Map<String,PrimeEditor> = new Map();
#else       private static var editors : Hash<PrimeEditor> = new Hash(); #end

    public static function main () {
        js.reveal.Reveal.addEventListener('slidechanged', loadEditor);
    }

    private static function loadEditor (e:js.reveal.Reveal.RevealEvent) {
        var slide = new js.JQuery(e.currentSlide);
        var fields = slide.find("textarea[name='hx-source']");
        for (code in fields)
            if (!editors.exists(code.prop("id")))
                editors.set(code.prop("id"), new PrimeEditor(code));
    }


    var editor     : Editor;
    var id         : String;
    var textarea   : JQuery;
    var messages   : JQuery;
    var compileBtn : JQuery;
    var targets    : JQuery;
    var outDisplay : JQuery;
    var haxeOutput : JQuery;
    var jsTab      : JQuery;


    public function new (t:JQuery)
    {
        textarea = t;
        id = t.prop("id");
        var editorId = "#demo-"+id+" ";
        initUI(id);

        var options = Editor.defaultOptions();
        options.haxeCode.lineNumbers = false;
        options.haxeCode.theme = "monokai";
        options.jsOutput.theme = "monokai";
        options.root   = "components/try-haxe/";
        options.id     = "demo-"+id;
        options.apiURI = new JQuery("body").data("api") + "/compiler";
        
        editor = new Editor(options);
        editor.handleLoaded    = updateTargetRadio;
        editor.handleCompile   = handleCompile;
        editor.handleCompiled  = handleCompiled;
        editor.handleCompleted = function () compileBtn.buttonReset();

        haxeOutput = new JQuery(editorId+"iframe[name='js-run']");
        messages   = new JQuery(editorId+".messages");
        compileBtn = new JQuery(editorId+".compile-btn");
        targets    = new JQuery(editorId+".hx-targets");
        jsTab      = new JQuery(editorId+"a[href='.js-source']");
        outDisplay = new JQuery(editorId+".compiler-out");
        
        new JQuery("body").bind("keyup", onKey);
        new JQuery(editorId+"a[data-toggle='tab']").bind("shown", function (_) editor.refreshSources());
        compileBtn.bind("click", function (e) { e.preventDefault(); editor.compile(); });
        targets.delegate("input.hx-target", "change", changeTarget);

        //read program options from textarea
        editor.startNewProgram();
        //TODO set compile options

    }


    public function dispose ()
    {
        editor.dispose();
        editor = null;
        id = null;
        textarea = messages = compileBtn = targets = outDisplay = haxeOutput = jsTab = null;
    }


    public function onKey (e:JqEvent)
         if ((e.ctrlKey && e.keyCode == 13) || e.keyCode == 119) { // Ctrl+Enter and F8
            e.preventDefault();
            editor.compile();
         }

    
    private function changeTarget (e:JqEvent)
    {
        editor.program.target = editor.toTarget(new JQuery(e.target).val().parseInt());
        updateTargetRadio();
    }


    private function updateTargetRadio () {
        switch (editor.program.target) {
            case JS(_):    jsTab.fadeIn();
            case SWF(_,_): jsTab.hide();
        }
        new JQuery("#demo-"+id+" input#"+targetString()+"-radio-"+id).attr('checked' ,'checked');
    }


    private inline function targetString () {
        return Type.enumConstructor(editor.program.target).toLowerCase();
    }



    //
    // EDITOR HANDLERS
    //

    private function handleCompile ()
    {
        messages.fadeOut(0);
        compileBtn.buttonLoading();
        editor.program.options = [new JQuery("#demo-"+id+" textarea[name='hx-source']").data("haxe-"+targetString())];
    }


    private function handleCompiled ()
    {
        var o = editor.output;
        var jsSourceElem = new JQuery(editor.jsSource.getWrapperElement());
        var msgType : String = "";

        outDisplay.show();
        if (o.success) {
            jsSourceElem.show();
            haxeOutput.show();
            
            switch (editor.program.target) {
                case JS(_): jsTab.show();
                default:    jsTab.hide();
            }

            haxeOutput.attr("src", o.href + "?r=" + Math.random().string());
        } else {
            haxeOutput.hide();
            jsTab.hide();
            jsSourceElem.hide();
            haxeOutput.attr("src", "about:blank");
        }
        messages.html("<i class='msg icon-" + (o.success ? "check" : "cancel") + "'></i><div class='message'></div>");
        
        if (o.stderr != null) {
            messages.append( new JQuery("<pre>").text(o.stderr) );
            if (!o.success) {
                var args = [], i = 0;
                while (i < o.args.length) {
                    args.push(o.args[i] + " " + o.args[i + 1]);
                    i += 2;
                }
                messages.append( new JQuery("<pre class='args'>").text(args.join("\n")) );
            }
        }
        messages.fadeIn();
        compileBtn.buttonReset();
    }


    private inline function initUI (id:String)
    {
        textarea.wrap('<div class="demo" id="demo-'+id+'" />')
            .before('<div class="control-group hx-targets">
        <a href="#" class="compile-btn btn" data-loading-text="Compiling"><i class="icon-cog"></i> Run</a>
        <div class="target-controls">
            <input type="radio" name="target-'+id+'" class="hx-target" value="'+Editor.JS+'" id="js-radio-'+id+'"><label for="js-radio-'+id+'" class="radio inline">JS</label>
            <input type="radio" name="target-'+id+'" class="hx-target" value="'+Editor.SWF+'" id="swf-radio-'+id+'"><label for="swf-radio-'+id+'" class="radio inline"> SWF</label>
        </div>
    </div>')
            .after('<div class="compiler-out">
        <ul class="nav nav-tabs">
            <li class="active"><a href=".js-output" data-toggle="tab">Output</a></li>
            <li><a href=".js-source" data-toggle="tab">JS Source</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane js-output active"><iframe class="js-run" src="about:blank" name="js-run" frameborder="no" scrolling="no"></iframe></div>
            <div class="tab-pane js-source"><textarea name="js-source" class="code js-source"></textarea></div>
            <div class="messages"></div>
        </div>
    </div>');
    }
}
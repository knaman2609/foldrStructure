#### Global Installation
- Nodejs
- Sass [gem install sass]
- Nodemon [npm install -g nodemon]
- Browserify [npm install -g browserify]
- Watchify [npm install -g watchify]
- Gulp [npm install -g gulp]
 
#### Local Installation
    npm install

### Dir Structure
	

    dist/
	    --css/minified.css    
	    --js/minified.js
	    --processed.html
	    
	src/
	    --css/
	        --out/compiled.css
	        --sass/
	            --base/settings.scss, reset.scss, mixin.scss, ..etc 
	            --components/button.scss, input.scss, modal.scss, ..etc
	            --files/login.scss, signup.scss, ..etc
	            --layout/header.scss, .footer.scss, ...etc
	        --vendor/bootstrap.scss
	        
	    --js/
	        --files/login.js
	        --out/complied.js
	        --templates/user-template.hbs
	        --utils/pretty-date.js
	        --vendor/vendor.min.js [files not present in node modules]
    
    html/login.html
    
    assets/
        fonts/
        img/
        
    server.js
    config.js
    mock.js
    routes.js
    package.json
    .gitignore
    gulpfile.js
    README.md

### Workflow [Dev]
##### Start  the server
   
    npm start   [DEBUG true]

##### Run Browserify with watchify [for js compilation]
    watchify src/js/files/my-sample-file.js -t hbsfy -o src/js/out/my-sample-file.js

    or

    set alias by:  
    javascriptCompile() {
  		foo="src/js/files/$1.js -t hbsfy -o src/js/out/$1.js"
    	watchify "$foo"
	}
	alias jc=javascriptCompile

	and run 
	jc [filename]  // without '.js'

##### Run Sass [for css compilation]
    sass --watch src/css/sass/files:src/css/out
    or
	set alias by:  alias sw='sass --watch src/css/sass/files:src/css/out'

	and  run
	sw

### Workflow [Prod]
    npm start   [DEBUG false]
    gulp --file [fileName] eg. gulp -file my-sample-file 
    
##### name of html, css and js should be same and unique for gulp-task to work properly
eg. for **login.html** in html folder you should have **login.scss** in **css/sass/files**
and **login.js** in **js/files/**
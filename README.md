#### Global Installation
- Nodejs
- Sass [gem install sass]
- Nodemon [npm install -g nodemon]
- Browserify [npm install -g browserify]
- Watchify [npm install -g watchify]
- Gulp [npm install -g gulp]
- 
 
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
   
    nodemon server.js   [DEBUG true]

##### Run Browserify with watchify [for js compilation]
    cd src/js      
    watchify files/my-sample-file.js -t hbsfy -o out/my-sample-file.js

##### Run Sass [for css compilation]
    cd src/css 
    sass --watch sass/files:out

### Workflow [Prod]
    nodemon server.js   [DEBUG false]
    gulp --file [fileName] eg. gulp -file my-sample-file 
    
##### name of html, css and js should be same and unique for gulp-task to work properly
eg. for **login.html** in html folder you should have **login.scss** in **css/sass/files**
and **login.js** in **js/files/**
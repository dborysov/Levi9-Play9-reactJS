const gulp = require('gulp'),
      babel = require('gulp-babel');
      
const src = {
    html: './app/index.html',
    jsx: './app/*.jsx',
    css: './app/*.css'
},
      dest = './dest'

gulp.task('jsx', () => 
    gulp.src(src.jsx)
        .pipe(babel())
        .pipe(gulp.dest(dest))
);

gulp.task('css', () => 
    gulp.src(src.css)
        .pipe(gulp.dest(dest))
);

gulp.task('html', () => 
    gulp.src(src.html)
        .pipe(gulp.dest(dest))
);

gulp.task('default', ['jsx', 'html', 'css']);

gulp.task('watch', ['default'], () => 
    gulp.watch([src.html, src.jsx, src.css], ['default'])
)
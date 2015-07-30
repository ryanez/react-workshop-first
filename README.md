# ReactJS Workshop

The purpose of this workshop/tutorial is to shorten the learning curve and provide a set of exercises & steps you need to follow to start writing React based applications.

# The requirements

- [Node.js & npm](https://docs.npmjs.com/getting-started/installing-node)

# The setup

- Create a directory for the project and then run `npm init`, follow your instincts to answer the wizard's questions.

# Getting started

The following two exercises will help you crete your first ReactJS components, you probably will be disappointed with the output you will get for all the work you will be required to do, so you can either walk away or be a little bit patient to get to the point where things pay back.

- [Exercise-01](exercise-01.md)
- [Exercise-02](exercise-02.md)
- [Exercise-03](exercise-03.md)

# JSX

JSX stands for JavaScript XML — an XML-like syntax for constructing markup within React components.

In [Exercise-04](exercise-04.md) you will see the advantages of using **JSX** instead of calling direcly the react's DOM api.

# JSX offline transform

You probably are thinking that it will cost a lot of time to the browser to `JSXTransform` all our scripts, and that the `html` file will no longer be maintainable as we continue adding more features. We can transform/process the **JSX** server side using the `react-tools`.

In the [Excercise-05](exercise-05.md) you will learn how to deal with this problem and jump to the next level.

# Reusable components

One of the most powerful things about ReactJS is that you can reuse your components, lets cover that in [Exercise-06](exercise-06.md).

# The build tools

Now the we have reusable components and our collection will grow and grow we need a better way to use them and ensure they are present in the browser when we need them to be there. Lets talk about it in [Exercise-07](exercise-07.md).

# External dependencies

As you noticed in the early stage of this workshop we are using a CDN to host the **React** framework (actually it was there and we don't have to pay for it). Lets see how to remove that dependency and include the ***React** framework as part of our build process [Exercise-08](exercise-08.md).

# Tired of writing so many times the build command

If you don't want to write the **Browserify** build command each time you want to bundle your files you can add it as part of your `scripts` on `package.json` file.

```
"scripts": {
    "build-08": "browserify -t reactify ui/exercise-08.js -o public/exercise-08.js -s rockandroll"
  },
```

Now you can go to command line and run `npm run build-08`

# Distribution

Now that you have managed to bundle the source files, next step is to mimify them.

- On command line run `npm install uglify-js`

The **uglifyjs** will work receive the stream that **Browserify** produces and will mimify it. Note that now we **DO NOT** want the browserify output to be persisted in a physical file, instead we want that stream to be **piped** to, and received by **uglifyjs**.

To concatenate the tools we will use the pipe `|` and then call the uglify tool `| uglify -m > public/exercise-08.min.js`

- Add a new script line in the `package.json` file named `build-08-dist`
```
  "scripts": {
    "build-08": "browserify -t reactify ui/exercise-08.js -o public/exercise-08.js -s rockandroll",
    "build-08-dist": "browserify -t reactify ui/exercise-08.js -s rockandroll | uglifyjs -m > public/exercise-08.min.js"
  },
```

**NOTE** that we removed the `-o public/exercise-08.js`

There is one point missing here `NODE_ENV=production`, I haven't added it because I'm running on windows and I need to write it each time I run the `npm run build-08-dist` command.

*Windows*
- On command line run `set NODE_ENV=production; npm run build-08-dist`.

*OS*
- Modify the script to read `"build-08-dist": "NODE_ENV=production browserify -t reactify ui/exercise-08.js -s rockandroll | uglifyjs -m > public/exercise-08.min.js"` and you are ready to run on command line `npm run build-08-dist`.

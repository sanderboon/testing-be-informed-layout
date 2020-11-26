This is a simple registry of view components,
we're not using any fancy registration because this
makes it hard(er) to tree-shake modules that are
not used in the application.

For customization we can simple replace the path to a component
in the import statements and rebuild using webpack

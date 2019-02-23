![](https://github.com/senselogic/STENCIL/blob/master/LOGO/stencil.png)

# Stencil

Code instantiator.

## Description

Stencil instantiates code variations from a reference implementation.

## Sample input

```
void AddUser(
    USER user
    )
{
    if ( user != null )
    {
        DATABASE.GetInstance().AddUser( user );
    }
}

// ~~

```
```
User => Article
        Section
        Comment
```

## Sample output

```
void AddArticle(
    ARTICLE article
    )
{
    if ( article != null )
    {
        DATABASE.GetInstance().AddArticle( article );
    }
}

// ~~

void AddSection(
    SECTION section
    )
{
    if ( section != null )
    {
        DATABASE.GetInstance().AddSection( section );
    }
}

// ~~

void AddComment(
    COMMENT comment
    )
{
    if ( comment != null )
    {
        DATABASE.GetInstance().AddComment( comment );
    }
}

// ~~

```

## Version

1.0

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.

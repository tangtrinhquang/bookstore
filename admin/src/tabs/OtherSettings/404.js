import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

const NotFound = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    No such page
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {"There's no such page."}
                </Typography>
                <Typography variant="body1">Perhaps you'd like to <Link href="/">go back?</Link></Typography>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Link color="inherit" href="/">
                        <Typography variant="body1">&gt;Go back to Dashboard.</Typography>
                    </Link>
                </Container>
            </footer>
        </div>
    );
}

export default NotFound;
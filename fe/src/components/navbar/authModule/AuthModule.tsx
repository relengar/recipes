import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthType } from '../navbar.model';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP, LOGIN } from './auth_module_query';
import { formatError } from '../../util/helpers/formatError';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { OperationVariables } from 'apollo-boost';

type AuthProps = {
    loadUser: () => void,
    authType: AuthType,
}

function onError(err: any): void {console.log(err)}

function getText(authType: AuthType): string {
    switch (authType) {
        case AuthType.LOGIN:
            return 'Log In';
        case AuthType.SIGNUP:
            return 'Sign Up';
        default:
            return '';
    }
}

function AuthModule({ loadUser, authType }: AuthProps) {
    const [ open, setOpen ] = React.useState(false);
    const options = {
        onCompleted: () => {
            client?.resetStore();
            loadUser()
            setOpen(false)
        },
        onError
    }
    const [ signup, { error: regError, client } ] = useMutation(SIGNUP, options);
    const [ login, { error: logError } ] = useMutation(LOGIN, options);
    const call =  async (type: AuthType, config: { variables: OperationVariables }) => {
        switch (type) {
            case AuthType.LOGIN:
                return await login(config);
            case AuthType.SIGNUP:
                return await signup(config);
        }
    } 

    const error = regError ?? logError;

    return (
        <>
            <button onClick={() => setOpen(true)} className="button">{getText(authType)}</button>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogContent>
                    <Formik
                        initialValues={{ name: '', password: ''}}
                        onSubmit={async (values, { setSubmitting }) => {
                            await call(authType, {variables: values});
                            setSubmitting(false);
                        }}
                        validate={(values) => {
                            const required = ['name', 'password'];
                            const errors = Object.entries(values)
                                .filter(([key, val]) => required.some(r => r === key && val === ''))
                                .map(([key]) => ([key, 'This field is required']))
                            return Object.fromEntries(errors);
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div className="field">
                                    <label className="label">Username</label>
                                    <Field placeholder="enter username" className="input" name="name" type="text"></Field>
                                    <ErrorMessage className="has-text-danger" name="name" component="div"></ErrorMessage>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <Field placeholder="type password" className="input" name="password" type="password"></Field>
                                    <ErrorMessage className="has-text-danger" name="password" component="div"></ErrorMessage>
                                </div>
                                <button type="submit" className="button is-success is-fullwidth" disabled={isSubmitting}>
                                    {getText(authType)}
                                </button>
                                {
                                    error &&
                                    <div className="has-text-centered">
                                        <p className="help is-danger">{formatError(error)}</p>
                                    </div>
                                }
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AuthModule;
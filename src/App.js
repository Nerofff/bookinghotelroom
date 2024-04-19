import { Fragment, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout.js';
import { publicRoutes, privateRoutes } from '~/routes';
import ScrollToTop from './ScrollToTop.js';
import PrivateRoute from './utils/PrivateRoute.js';
import { clearLocalStorage } from './utils/index.js';

function App() {
    /* localStorage.setItem('userId', 1); */
    /*  useEffect(() => {
        window.addEventListener('beforeunload', clearLocalStorage());
        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage());
        };
    }, []); */

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        /* const Layouts = route.layout === null ? Fragment : DefaultLayout; */

                        const Page = route.component;

                        let Layouts = DefaultLayout;

                        if (route.layout) {
                            Layouts = route.layout;
                        } else if (route.layout === null) {
                            Layouts = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <>
                                        <ScrollToTop />
                                        <Layouts>
                                            <Page />
                                        </Layouts>
                                    </>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        /* const Layouts = route.layout === null ? Fragment : DefaultLayout; */

                        const Page = route.component;

                        let Layouts = DefaultLayout;

                        if (route.layout) {
                            Layouts = route.layout;
                        } else if (route.layout === null) {
                            Layouts = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    /*  requiredRole={route.requiredRole}> */
                                    <PrivateRoute>
                                        <ScrollToTop />
                                        <Layouts>
                                            <Page />
                                        </Layouts>
                                    </PrivateRoute>
                                    /*   </PrivateRoute> */
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

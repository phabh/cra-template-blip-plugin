import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { page } from '../services/analytics';
import RoutesPath from '../constants/routes-path';
import settings from '../config';

const Analytics = ({ children }) => {
    const history = useHistory();

    useEffect(() => {
        if (!!settings.segment.key) {
            return history.listen((location) => {
                const { pathname, state } = location;
                const title = getPageTitle(pathname);
                page(title, { state });
            });
        }

        // eslint-disable-next-line
    }, [history]);

    const getPageTitle = (pathname) => {
        // eslint-disable-next-line no-unused-vars
        const [id, details] =
            Object.entries(RoutesPath).find(([i, d]) => d.PATH === pathname) ||
            [];

        return details ? details.NAME : '';
    };

    return <Fragment>{children}</Fragment>;
};

Analytics.propTypes = {
    children: PropTypes.any
};

export default Analytics;

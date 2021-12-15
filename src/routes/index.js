import Login  from '../pages/login'
import DashboardContent from '../pages/Dashboard/Dashboard'
import CheckboxListSecondary from '../pages/Products/Products'

export const routes = [
    {
        path: '/',
        component: <Login />,
    },
    {
        path: '/dashboard',
        component: <DashboardContent />,
    },
    {
        path: '/dashboard/products',
        component:  <DashboardContent a="aaaa" />,
        template: 'dashboard',
    },
    {
        path: '/dashboard/stories/*',
        component: <DashboardContent />,
    },
]
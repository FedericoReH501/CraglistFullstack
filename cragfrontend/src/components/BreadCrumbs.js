import PinDropIcon from '@mui/icons-material/PinDrop';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TourIcon from '@mui/icons-material/Tour';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import { Breadcrumbs,Paper,Typography,Link,ListItem,ListItemText } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  useParams,
} from 'react-router-dom';
import Region from './Region';

const breadcrumbNameMap = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
}

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

const BreadCrumb = ()=>{
  const params = Object.entries(useParams())
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('pathname:',pathnames)
  return(
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        console.log('last index:',last)
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        console.log('to:',to)
        console.log('params:',params)

        return last ? (
          <Typography color="text.primary" key={to}>
            {value}
            
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {value}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>

  )

}

export default BreadCrumb
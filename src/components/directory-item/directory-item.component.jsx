import { useNavigate } from 'react-router-dom';

import { Directory, Body, BackgroundImage } from './directory-item.styles'

const DirectoryItem = ({category}) => {
    const {title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <Directory onClick={onNavigateHandler}>
          <BackgroundImage imageUrl = {imageUrl}/>
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </Directory>
    );
}

export default DirectoryItem;
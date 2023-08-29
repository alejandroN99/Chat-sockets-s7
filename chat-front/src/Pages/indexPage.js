import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const navigate = useNavigate();

        React.useEffect(() => {
            const token = localStorage.getItem('CU_Token');

            if(!token) {
                navigate('/login');
            }else{
                navigate('/chatroom');
            }

        }, [navigate]);

    return <div>Index</div>
};

export default IndexPage;
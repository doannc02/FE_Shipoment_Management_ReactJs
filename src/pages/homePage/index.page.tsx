import React, { useEffect, useState } from "react";
import HomePage from "../../views/HomePage";

const IndexPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await fakeAuthCheck();
      if (!auth) {
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [history]);

  const fakeAuthCheck = async () => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <HomePage />;
};

export default IndexPage;

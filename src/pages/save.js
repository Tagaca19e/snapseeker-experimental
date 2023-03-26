import { React } from 'react';
import Layout from '../components/Layout';
import ProductListSaveItems from '@/components/ProductListSaveItems';
import { getSession } from 'next-auth/react';
import CameraUpload from '../components/CameraUpload';
import ProductListLoader from '@/components/ProductListLoader';
import clientPromise from 'lib/mongodb';

export default function dashboard2({ products, isMobileView }) {
  return (
    <div>
      <Layout>
        <CameraUpload isMobileView={isMobileView} />
        <ProductListLoader />
        <ProductListSaveItems products={products} />
      </Layout>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);


  const user_email = session.user.email;

  const client = await clientPromise;

  const db = client.db('snapseeker');
  const data = await db.collection('save_items').find({ }).limit(20).toArray();
  // Find the user in the database.
 // if (!user) {
 //   return res
 //     .status(400)
 //     .json({ message: 'No Save Items' });
 // }

  const properties = JSON.parse(JSON.stringify(data));


  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const userAgent = context.req.headers['user-agent'];
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? true
    : false;

  return {
    props: {
      session,
      products: properties,
      isMobileView,
    },
  };
}
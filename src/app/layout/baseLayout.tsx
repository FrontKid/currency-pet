import { Home } from '@/pages/home';
import { Header } from '@/widgets/header';
import { Layout } from '@/shared/ui';

const baseLayout = <Layout header={<Header />} home={<Home />} />;

export { baseLayout };

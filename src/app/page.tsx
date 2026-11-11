import { getHomeContent } from '../data/home';
import { HomePage } from '../components/HomePage';
export default async function Page() {
  return <HomePage content={await getHomeContent()} />;
}

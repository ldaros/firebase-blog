import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDate } from '@/lib/utils';

const Post = ({ id, title, date }) => {
 

  return (
    <Link to={`/posts/${id}`}>
      <Card className="mb-4 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription>Posted on {formatDate(date)}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export { Post };

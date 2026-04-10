import { View, Text } from 'react-native';
import { ErrorBoundaryProps } from 'expo-router';
import { AlertCircleIcon } from 'lucide-react-native';
import { AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Alert } from '@/components/ui/alert';

const FeedbacksDeErrorPorDefecto = ({ error, retry }: ErrorBoundaryProps) => {
  return (
    <View className='flex-1 justify-center p-4'>
       <Alert variant="destructive" icon={AlertCircleIcon}>
        <AlertTitle>ooops</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </View>
  );
};

export default FeedbacksDeErrorPorDefecto;
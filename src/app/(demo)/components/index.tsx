import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { type Href, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import {
  Accordion,
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Popover,
  Radio,
  Select,
  Separator,
  Skeleton,
  Spinner,
  Surface,
  Switch,
  Tabs,
  useToast,
} from 'heroui-native';

const StyledIonicons = withUniwind(Ionicons);

type Component = {
  title: string;
  path: Href;
};

const components: Component[] = [
  {
    title: 'Accordion',
    path: '/components/accordion',
  },
  {
    title: 'Avatar',
    path: '/components/avatar',
  },
  {
    title: 'Button',
    path: '/components/button',
  },
  {
    title: 'Card',
    path: '/components/card',
  },
  {
    title: 'Checkbox',
    path: '/components/checkbox',
  },
  {
    title: 'Chip',
    path: '/components/chip',
  },
  {
    title: 'Dialog',
    path: '/components/dialog',
  },
  {
    title: 'Separator',
    path: '/components/divider',
  },
  {
    title: 'Error View',
    path: '/components/error-view',
  },
  {
    title: 'Form Field',
    path: '/components/form-field',
  },
  {
    title: 'Popover',
    path: '/components/popover',
  },
  {
    title: 'Pressable Feedback',
    path: '/components/pressable-feedback',
  },
  {
    title: 'Radio Group',
    path: '/components/radio-group',
  },
  {
    title: 'Scroll Shadow',
    path: '/components/scroll-shadow',
  },
  {
    title: 'Select',
    path: '/components/select',
  },
  {
    title: 'Skeleton',
    path: '/components/skeleton',
  },
  {
    title: 'Spinner',
    path: '/components/spinner',
  },
  {
    title: 'Surface',
    path: '/components/surface',
  },
  {
    title: 'Switch',
    path: '/components/switch',
  },
  {
    title: 'Tabs',
    path: '/components/tabs',
  },
  {
    title: 'Text Field',
    path: '/components/text-field',
  },
  {
    title: 'Toast',
    path: '/components/toast',
  },
];

export default function App() {
  const router = useRouter();
  const pathname = usePathname();

  const { toast, isToastVisible } = useToast();

  useEffect(() => {
    if (isToastVisible && pathname === '/components') {
      toast.hide('all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToastVisible, pathname]);

  return (
    <ScreenScrollView contentContainerClassName="px-4">
      <View className="h-5" />
      <Accordion isCollapsible={false} variant="surface">
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(item.path);
              }}
            >
              <AppText className="text-foreground text-base ml-1">
                {item.title}
              </AppText>
              <Accordion.Indicator>
                <StyledIonicons
                  name="chevron-forward"
                  size={16}
                  className="text-muted"
                />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScreenScrollView>
  );
}

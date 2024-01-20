import Dialog from '@/components/Dialog';
import { useDialog } from '@/hooks/useDialog';
import { IconsOptions, IconsType } from '@/types';

type DialogHome = {
  title: string;
  icon: IconsOptions;
  children: React.ReactNode;
};

const DialogHome = ({ title, icon, children }: DialogHome) => {
  const { setShowDialog } = useDialog();

  return (
    <Dialog.Dialog>
      <Dialog.DialogTitle icon={IconsType[icon]} title={title} />
      <Dialog.DialogContent>{children}</Dialog.DialogContent>
      <Dialog.DialogActions
        primaryTxtButton="Fechar"
        primaryActionButton={() => setShowDialog(false)}
      />
    </Dialog.Dialog>
  );
};

export default DialogHome;

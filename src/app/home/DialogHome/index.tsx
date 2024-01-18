import { useDialog } from '@/hooks/useDialog';
import Dialog, { Icons } from '@/components/Dialog';

type DialogHome = {
  title: string;
  icon: Icons;
  children: React.ReactNode;
};

const DialogHome = ({ title, icon, children }: DialogHome) => {
  const { setShowDialog } = useDialog();

  return (
    <Dialog.Dialog>
      <Dialog.DialogTitle icon={Icons[icon]} title={title} />
      <Dialog.DialogContent>{children}</Dialog.DialogContent>
      <Dialog.DialogActions
        primaryTxtButton="Fechar"
        primaryActionButton={() => setShowDialog(false)}
      />
    </Dialog.Dialog>
  );
};

export default DialogHome;

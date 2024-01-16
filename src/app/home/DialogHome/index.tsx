import { useDialog } from '@/hooks/useDialog';
import Dialog, { Icons } from '@/components/Dialog';

const DialogHome = () => {
  const { setShowDialog } = useDialog();

  return (
    <Dialog.Dialog>
      <Dialog.DialogTitle icon={Icons.success} title="Sucessso" />
      <Dialog.DialogContent>
        <p>Foi</p>
      </Dialog.DialogContent>
      <Dialog.DialogActions
        primaryTxtButton="Fechar"
        primaryActionButton={() => setShowDialog(false)}
      />
    </Dialog.Dialog>
  );
};

export default DialogHome;

import FlexRow from "@/components/skeleton/FlexRow";
import Margin from "@/components/skeleton/Margin";
import Split from "@/components/skeleton/Split";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import TextArea from "@/components/UI/TextArea";
import { AnimatePresence } from "framer-motion";

export default function EditProductModal({ isOpen, onClose }) {
    return <AnimatePresence initial={false} exitBeforeEnter={true}>
        {isOpen &&
            <Modal isOpen={isOpen} onClose={onClose}>
                <Header>Edit product</Header>
                <Margin height={'10px'} />
                add item preview here
                <Input label={'Item name'} />
                <Margin height={'10px'} />
                <Split>
                    <Input label={'Price'} />

                    <Input label={'Amount in stock'} />
                </Split>
                <Margin height={'10px'} />
                <Margin height={'10px'} />
                <Input label={'Link to the image'} />
                <Margin height={'10px'} />
                <TextArea label={'Description'} />
                <Margin height={'10px'} />
                <FlexRow flexDirection={'row-reverse'}>
                    <Button>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </FlexRow>
            </Modal>
        }
    </AnimatePresence>
}

"use client"

import { Web } from "@/types/app/project";
import { Modal, ModalContent, ModalHeader, ModalBody, UseDisclosureProps, Snippet } from "@heroui/react"

interface Props {
    disclosure: UseDisclosureProps & { onOpenChange: () => void },
    data: Web
}

export default ({ disclosure, data }: Props) => {
    const { isOpen, onClose, onOpenChange } = disclosure;


    return (
        <>
            <Modal
                size="lg"
                backdrop="opaque" 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">查看订阅地址</ModalHeader>

                            <ModalBody>
                                <Snippet symbol="" className="mb-6">{data?.url + '/api/rss'}</Snippet>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
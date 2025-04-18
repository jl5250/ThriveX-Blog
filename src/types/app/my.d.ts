export interface Info {
    name: string;
    avatar: StaticImageData;
    profession: string;
    introduction: string;
}

export interface InfoTwo {
    author: string;
    avatar_url: string;
    left_tags: string[];
    right_tags: string[];
    know_me: string;
};

export interface Character {
    value: number;
    text1: string;
    text2: string;
    content: string;
    color: string;
}

export interface Goal {
    status: number;
    value: string;
}

export interface Project {
    name: string;
    images: string[];
    description: string;
    front: {
        technology: string;
        url: string;
    };
    control: {
        technology: string;
        url: string;
    };
    backend: {
        technology: string;
        url: string;
    };
}

export interface MyData {
    info: Info,
    infoTwo: InfoTwo,
    character: Character[],
    goals: Goal[],
    project: Project[]
}